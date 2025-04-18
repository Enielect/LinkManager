// pages/api/extract-metadata.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url) {
      return new Response('The Url passed is not valid', { status: 400 });
    }

    const metadata = await extractMetadata(url);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return new NextResponse('Failed to extract metadata', {
      status: 500,
    });
    // return res.status(500).json({ error: 'Failed to extract metadata' });
  }
}

async function extractMetadata(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkManagerBot/1.0)',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract metadata
    const metadata: {
      url: string;
      title: string;
      description: string;
      image: string | null;
      favicon: string | null;
    } = {
      url,
      title: '',
      description: '',
      image: null,
      favicon: null,
    };

    // Try Open Graph title or fallback to HTML title
    metadata.title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      $('meta[name="twitter:title"]').attr('content') ||
      '';

    // Try description from various sources
    metadata.description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      '';

    // Try to find an image
    metadata.image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      null;

    // Try to find favicon
    const faviconHref =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');

    if (faviconHref) {
      // Handle relative URLs for favicon
      metadata.favicon = new URL(faviconHref, url).toString();
    }

    // If no image was found, take a screenshot
    if (!metadata.image) {
      metadata.image = await takeScreenshot(url);
    }

    return metadata;
  } catch (error) {
    console.error('Error in extractMetadata:', error);
    throw error;
  }
}

async function takeScreenshot(url: string): Promise<string | null> {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1200, height: 630 });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot and convert to base64
    const screenshotBuffer = await page.screenshot();
    const base64Screenshot = `data:image/png;base64,${Buffer.from(screenshotBuffer).toString('base64')}`;

    return base64Screenshot;
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

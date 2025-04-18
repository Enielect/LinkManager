import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    const { data: html } = await axios.get(url);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract metadata
    const title = document.querySelector('title')?.textContent;
    const description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    const keywords = document
      .querySelector('meta[name="keywords"]')
      ?.getAttribute('content');

    // Extract image preview (trying multiple possible meta tags)
    const imageUrl =
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content') ||
      document
        .querySelector('meta[name="twitter:image"]')
        ?.getAttribute('content') ||
      document.querySelector('meta[name="image"]')?.getAttribute('content') ||
      document.querySelector('link[rel="image_src"]')?.getAttribute('href');

    return NextResponse.json({
      title: title || 'No title found',
      description: description || 'No description found',
      keywords: keywords || 'No keywords found',
      imageUrl: imageUrl || 'No preview image found',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}

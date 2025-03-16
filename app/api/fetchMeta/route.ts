// export const dynamic = 'force-static';

import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the URL
    const body = await req.json();
    const url = body.url;

    // Fetch the HTML content of the URL
    const { data: html } = await axios.get(url);

    // Load the HTML into jsdom
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract metadata
    const title = document.querySelector('title')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');

    // Return the extracted metadata as a JSON response
    return NextResponse.json({
      title: title || 'No title found',
      description: description || 'No description found',
      keywords: keywords || 'No keywords found',
    });

    //eslint-disable-next-line
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
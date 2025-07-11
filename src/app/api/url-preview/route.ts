// In your existing /api/url-preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract OG image
    const ogImage = $('meta[property="og:image"]').attr('content') || 
                    $('meta[name="twitter:image"]').attr('content');
    
    // Make sure image URL is absolute
    const imageUrl = ogImage ? new URL(ogImage, url).toString() : null;
    
    return NextResponse.json({
      image: imageUrl,
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content'),
      favicon: $('link[rel="icon"]').attr('href')
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

interface MetaData {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  // Ensure URL is provided and is a string
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Basic URL validation
    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Fetch the webpage
    const metadata = await fetchMetadata(validatedUrl);
    
    return res.status(200).json(metadata);
  } catch (error) {
    console.error('Error fetching URL preview:', error);
    return res.status(500).json({ error: 'Failed to fetch URL preview' });
  }
}

function validateUrl(url: string): string | null {
  try {
    // Try to create a new URL object to validate
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return null;
    }
    return parsedUrl.toString();
  } catch (error) {
    return null;
  }
}

async function fetchMetadata(url: string): Promise<MetaData> {
  try {
    // Fetch with a timeout and user agent
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; URLPreviewBot/1.0)',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const metadata = extractMetadata(html, url);
    
    return metadata;
  } catch (error) {
    console.error('Error fetching URL:', error);
    // Return basic fallback data
    return {
      url,
      title: new URL(url).hostname,
      description: 'No description available',
      image: '',
      favicon: '/favicon.ico',
      siteName: new URL(url).hostname,
    };
  }
}

function extractMetadata(html: string, url: string): MetaData {
  const $ = cheerio.load(html);
  const baseUrl = new URL(url);
  const origin = baseUrl.origin;
  
  // Extract Open Graph and other metadata
  const metadata: MetaData = {
    url,
    title: '',
    description: '',
    image: '',
    favicon: '',
    siteName: '',
  };

  // Title: og:title > twitter:title > <title> tag
  metadata.title = 
    $('meta[property="og:title"]').attr('content') || 
    $('meta[name="twitter:title"]').attr('content') || 
    $('title').text() || 
    baseUrl.hostname;

  // Description: og:description > twitter:description > meta description
  metadata.description = 
    $('meta[property="og:description"]').attr('content') || 
    $('meta[name="twitter:description"]').attr('content') || 
    $('meta[name="description"]').attr('content') || 
    'No description available';

  // Image: og:image > twitter:image
  let imageUrl = 
    $('meta[property="og:image"]').attr('content') || 
    $('meta[name="twitter:image"]').attr('content') || 
    '';
  
  // If image URL is relative, convert to absolute
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = new URL(imageUrl, origin).toString();
  }
  metadata.image = imageUrl;

  // Favicon
  let faviconUrl = 
    $('link[rel="icon"]').attr('href') || 
    $('link[rel="shortcut icon"]').attr('href') || 
    '/favicon.ico';
  
  // If favicon URL is relative, convert to absolute
  if (faviconUrl && !faviconUrl.startsWith('http')) {
    faviconUrl = new URL(faviconUrl, origin).toString();
  }
  metadata.favicon = faviconUrl;

  // Site name: og:site_name > domain name
  metadata.siteName = 
    $('meta[property="og:site_name"]').attr('content') || 
    baseUrl.hostname;

  return metadata;
}
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return NextResponse.json({ error: 'Only http/https URLs are supported' }, { status: 400 });
  }

  try {
    const response = await fetch(parsedUrl, { redirect: 'follow' });

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to fetch image' }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'The provided URL does not point to an image' }, { status: 400 });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load image' }, { status: 502 });
  }
}

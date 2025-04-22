import { NextResponse } from 'next/server';

export const GET = async () => {
  const isProd = process.env.NODE_ENV === 'production';

  const content = `
User-agent: *
Disallow: ${isProd ? '' : '/'}

# Host
Host: ${process.env.NEXT_PUBLIC_SITE_URL}

# Sitemaps
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

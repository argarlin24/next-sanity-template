// @ts-check
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import fetchRedirects from './src/utils/redirect.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  trailingSlash: true,
  transpilePackages: ['ui', 'utils'],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ],
    },
  ],
  redirects: async () => {
    const sanityRedirects = await fetchRedirects();

    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      ...sanityRedirects.map(({ from, to, permanent }) => ({
        source: from,
        destination: to,
        permanent: !!permanent,
      })),
    ];
  },
};

export default nextConfig;

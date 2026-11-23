import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Millerz Technologies — Full-Stack Web & SEO Engineering',
    short_name: 'Millerz Tech',
    description:
      'Production web platforms, mobile engineering, Prisma & SQLite architectures, and technical SEO by Millerz Technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0d0b',
    theme_color: '#0a0d0b',
    icons: [
      {
        src: '/images/millerz-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

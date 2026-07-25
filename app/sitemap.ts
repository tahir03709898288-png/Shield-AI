import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://shieldai.tahirlabs.com';
  const routes = ['', '/scanner', '/features', '/about', '/contact', '/privacy', '/terms'];
  const now = new Date();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/scanner' ? 0.9 : 0.7,
  }));
}

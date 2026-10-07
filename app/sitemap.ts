import { MetadataRoute } from 'next';
import { siteConfig, navLinks } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((route) => ({
    url: `${siteConfig.url}${route.href === '/' ? '' : route.href}`,
    lastModified: new Date(),
    changeFrequency: route.href === '/' ? 'weekly' : 'monthly',
    priority: route.href === '/' ? 1 : 0.8,
  }));
}

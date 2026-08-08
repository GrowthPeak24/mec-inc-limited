import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { CASE_STUDIES } from '@/content/case-studies';
import { SERVICE_CATEGORIES } from '@/content/service-categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,          lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/services`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map((c) => ({
    url: `${base}/services/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${base}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...caseStudyRoutes];
}

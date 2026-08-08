import { SITE } from '@/lib/site';
import type { ServiceCategory } from '@/types/content';

const ORG_ID = `${SITE.url}/#organization`;

/** Service + OfferCatalog for one category page. */
export function serviceSchema(category: ServiceCategory) {
  const items = category.capabilityGroups.flatMap((g) => g.items);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/services/${category.slug}#service`,
    name: category.name,
    serviceType: category.name,
    description: category.seo.description,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'Jamaica' },
      { '@type': 'Place', name: 'Caribbean' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${category.name} capabilities`,
      itemListElement: items.map((item, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  } as const;
}

/** FAQPage JSON-LD generated from the same faqs array that renders the
 *  <details> block — so search results can never disagree with the page. */
export function faqSchema(faqs: ServiceCategory['faqs']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } as const;
}

/** Standard site breadcrumb. items is [{name,url}]. */
export function breadcrumbSchema(
  items: readonly { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  } as const;
}

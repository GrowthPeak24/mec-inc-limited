import { SITE } from '@/lib/site';
import type { CaseStudy } from '@/types/content';

const ORG_ID = `${SITE.url}/#organization`;

export function caseStudySchema(study: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE.url}/portfolio/${study.slug}#work`,
    name: study.title,
    headline: study.title,
    about: study.tags,
    keywords: study.tags.join(', '),
    creator: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    dateCreated: `${study.year}-01-01`,
    description: study.summary,
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/portfolio`,
      name: 'Selected work',
    },
  } as const;
}

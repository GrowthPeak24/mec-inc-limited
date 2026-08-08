import { SITE } from '@/lib/site';

const ORG_ID = `${SITE.url}/#organization`;
const LB_ID = `${SITE.url}/#business`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
    email: SITE.email,
    telephone: SITE.tel.e164,
    slogan: SITE.tagline,
    foundingDate: SITE.founded,
    areaServed: [
      { '@type': 'Country', name: 'Jamaica' },
      { '@type': 'Place', name: 'Caribbean' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
  } as const;
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': LB_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.tel.e164,
    email: SITE.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHours: SITE.hours,
    parentOrganization: { '@id': ORG_ID },
  } as const;
}

export const SITE = {
  name: 'MEC Inc. Limited',
  legalName: 'Marketing, Events and Catering (MEC) Inc. Limited',
  tagline: 'Impacting Brands through Innovative Solutions',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://mecincja.com',
  email: 'mecincja@gmail.com',
  tel: {
    display: '876-565-8200',
    href: 'tel:+18765658200',
    e164: '+18765658200',
  },
  address: {
    street: '17 Dewsbury Avenue',
    locality: 'Kingston 6',
    region: 'Kingston',
    country: 'JM',
    countryName: 'Jamaica',
  },
  // Kingston 6 (Liguanea) approximate — flagged in plan risk #3 as
  // client-confirmation-needed before launch.
  geo: { latitude: 18.0177, longitude: -76.7645 },
  founded: '2014',
  hours: 'Mo-Fr 09:00-17:00',
} as const;

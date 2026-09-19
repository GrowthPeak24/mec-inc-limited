import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How MEC Inc. Limited handles the information you share with us.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <Section size="md">
      {/* No @tailwindcss/typography here, so paragraph rhythm and link styling are
          spelled out on the article rather than assumed from a `prose` class. */}
      <article className="mx-auto max-w-2xl leading-relaxed text-[var(--color-ink)]/80 [&_a]:underline [&_a]:decoration-[var(--color-gold)]/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-current [&_p]:mt-3">
        <p className="eyebrow text-[var(--color-gold)]">
          Privacy
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
          Privacy notice
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">Last updated: August 2026</p>

        <h2 className="mt-10 text-lg font-semibold text-[var(--color-ink)]">What we collect</h2>
        <p>
          When you submit the Quote Builder or the contact form, we collect the
          business details you enter (company, name, work email, phone if
          provided) and the project information you share. We also store a
          salted, one-way hash of your IP address for spam and rate-limiting
          purposes. We do not retain the raw IP.
        </p>

        <h2 className="mt-10 text-lg font-semibold text-[var(--color-ink)]">How we use it</h2>
        <p>
          Solely to respond to your enquiry, scope your brief, and follow up on
          related opportunities you&rsquo;ve expressed interest in. We do not sell,
          rent, or share your details with third parties for marketing.
        </p>

        <h2 className="mt-10 text-lg font-semibold text-[var(--color-ink)]">Retention</h2>
        <p>
          Enquiries are retained for up to 36 months so we can maintain project
          continuity for repeat clients. You may request deletion at any time by
          emailing{' '}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>

        <h2 className="mt-10 text-lg font-semibold text-[var(--color-ink)]">Contact</h2>
        <p>
          MEC Inc. Limited, {SITE.address.street}, {SITE.address.locality},{' '}
          {SITE.address.countryName}. Phone{' '}
          <a href={SITE.tel.href} className="underline">
            {SITE.tel.display}
          </a>
          .
        </p>
      </article>
    </Section>
  );
}

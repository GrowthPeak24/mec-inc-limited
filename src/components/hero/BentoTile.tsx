import type { MediaRef } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';
import { FrostedBadge } from './FrostedBadge';
import { clsx } from '@/lib/clsx';

type Props = {
  media: MediaRef;
  label: string;
  caption: string;
  href?: string;
  /** LCP tiles set this — max 3 across the whole page. */
  priority?: boolean;
  className?: string;
  /** Passed through to next/image so srcset resolution matches slot width. */
  sizes: string;
};

/** One rectangle in the hero bento. Owns its own image, badge and
 *  caption. Parent decides grid position / aspect ratio via className.
 *  Surface treatment: inset hairline ring + layered scrim so the caption
 *  holds contrast over any photograph. */
export function BentoTile({
  media,
  label,
  caption,
  href,
  priority,
  className,
  sizes,
}: Props) {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={clsx(
        'group relative block overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)]',
        'ring-1 ring-inset ring-[var(--color-line)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]',
        href && 'hover:ring-[var(--color-gold)]/40 hover:shadow-[0_30px_60px_-30px_rgba(15,82,186,0.55)] focus-visible:outline-none',
        className,
      )}
    >
      <MediaImage
        media={media}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <FrostedBadge>{label}</FrostedBadge>
        <div>
          <p className="max-w-[26ch] text-lg font-medium leading-snug text-white md:text-xl">
            {caption}
          </p>
          {href && (
            <span
              aria-hidden
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/0 transition-colors duration-500 group-hover:text-white/85"
            >
              View
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="nudge">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

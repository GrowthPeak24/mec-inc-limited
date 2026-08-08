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
 *  caption. Parent decides grid position / aspect ratio via className. */
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
        href && 'focus-visible:outline-none',
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <FrostedBadge>{label}</FrostedBadge>
        <p className="max-w-[26ch] text-lg font-medium leading-snug text-white md:text-xl">
          {caption}
        </p>
      </div>
    </Wrapper>
  );
}

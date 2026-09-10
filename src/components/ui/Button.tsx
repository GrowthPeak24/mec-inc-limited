import Link from 'next/link';
import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]';

/* `ghost` and `outline` derive their colour from the inherited text colour
   (Section sets paper on ink tones, ink on sand/paper tones). That keeps a
   single variant legible on every surface — previously both were hard-coded
   to --color-paper and rendered white-on-white inside `tone="paper"` and
   white-on-sand inside `tone="sand"` sections. */
const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-gold)] text-[var(--color-paper)] hover:bg-[var(--color-gold-2)] shadow-[0_10px_30px_-12px_rgba(15,82,186,0.6)] hover:shadow-[0_16px_40px_-14px_rgba(0,0,255,0.7)]',
  ghost:
    'text-current hover:text-[var(--color-gold-2)]',
  outline:
    'border border-current/30 text-current hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5',
};

const sizes: Record<Size, string> = {
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

interface Common {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      <ArrowRight />
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="nudge">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

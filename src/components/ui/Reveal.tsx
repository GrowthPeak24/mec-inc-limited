'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Wrap children in a compositor-only fade+slide-in on first intersection.
 * Skipped entirely for `prefers-reduced-motion: reduce` via CSS.
 */
export function Reveal({
  children,
  delay = 0,
  stagger = false,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** Children of a `.stagger` container enter one after another instead of
   *  the wrapper fading in as a block. See globals.css. */
  stagger?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.visible = 'true';
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = 'true';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal={stagger ? 'stagger' : true}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

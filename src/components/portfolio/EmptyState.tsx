import Link from 'next/link';

export function EmptyState({ tag }: { tag: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--color-line-ink)] bg-[var(--color-paper)] p-10 text-center">
      <p className="text-lg font-semibold text-[var(--color-ink)]">
        No case studies tagged &ldquo;{tag}&rdquo; yet.
      </p>
      <p className="mt-2 text-[var(--color-ink)]/60">
        Reset the filter or browse all work.
      </p>
      <Link
        href="/portfolio"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] hover:bg-[var(--color-ink-2)]"
      >
        See all work
      </Link>
    </div>
  );
}

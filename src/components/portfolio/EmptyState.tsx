import { Button } from '@/components/ui/Button';

export function EmptyState({ tag }: { tag: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--color-line-ink)] bg-[var(--color-paper)] p-10 text-center">
      <p className="text-lg font-semibold text-[var(--color-ink)]">
        No case studies tagged &ldquo;{tag}&rdquo; yet.
      </p>
      <p className="mt-2 text-[var(--color-ink)]/60">
        Reset the filter or browse all work.
      </p>
      <div className="mt-6">
        <Button href="/portfolio">See all work</Button>
      </div>
    </div>
  );
}

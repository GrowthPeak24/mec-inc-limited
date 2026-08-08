export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-paper)]"
    >
      Skip to main content
    </a>
  );
}

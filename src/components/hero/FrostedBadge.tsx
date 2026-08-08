export function FrostedBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="frost inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden />
      {children}
    </span>
  );
}

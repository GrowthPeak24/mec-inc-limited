import type { ServiceCategory } from '@/types/content';

export function CapabilityList({
  groups,
}: {
  groups: ServiceCategory['capabilityGroups'];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            {g.title}
          </h3>
          <ul className="mt-4 space-y-2">
            {g.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[var(--color-ink)]/80"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                />
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

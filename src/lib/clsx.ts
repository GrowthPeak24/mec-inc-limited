export type ClassValue = string | number | null | false | undefined | ClassValue[];

/** Tiny classnames helper — no dependency needed. */
export function clsx(...values: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) v.forEach(walk);
    else out.push(String(v));
  };
  values.forEach(walk);
  return out.join(' ');
}

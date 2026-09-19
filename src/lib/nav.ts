/** A nav link is active on its own route and anywhere beneath it
 *  (`/portfolio` stays lit on `/portfolio/some-case-study`). */
export function isActiveHref(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

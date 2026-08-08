import Image from 'next/image';
import { CLIENT_LOGOS } from '@/content/client-logos';

/** Pure-CSS marquee: duplicate the logo list exactly once and translate
 *  the track -50% over the marquee-duration. Zero JS, zero listeners,
 *  respects prefers-reduced-motion via globals.css. */
export function ClientMarquee() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="marquee" aria-label="Selected MEC clients">
      <div className="marquee-track">
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="marquee-item"
            style={{ width: logo.width }}
            aria-hidden={i >= CLIENT_LOGOS.length}
          >
            <Image
              src={logo.src}
              alt={i < CLIENT_LOGOS.length ? logo.name : ''}
              height={44}
              width={logo.width}
              sizes={`${logo.width}px`}
              className="h-11 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

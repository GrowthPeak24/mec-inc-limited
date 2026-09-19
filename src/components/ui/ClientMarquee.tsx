import Image from 'next/image';
import { CLIENT_LOGOS } from '@/content/client-logos';

/** Optical sizing. Logos range from 0.9:1 to 8:1, so a single height makes wide
 *  wordmarks huge and square marks tiny. Sizing each to roughly the same painted
 *  area (capped by height and width) evens out their visual weight while
 *  keeping brand colours untouched: NCB and Scotiabank guidelines forbid
 *  recolouring, so no grayscale filter. */
const TARGET_AREA = 6000;
const MAX_HEIGHT = 52;
const MAX_WIDTH = 190;

function fit(width: number, height: number) {
  const ratio = width / height;
  let h = Math.min(MAX_HEIGHT, Math.sqrt(TARGET_AREA / ratio));
  let w = h * ratio;
  if (w > MAX_WIDTH) {
    w = MAX_WIDTH;
    h = w / ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
}

/** Pure-CSS marquee: duplicate the logo list exactly once and translate
 *  the track -50% over the marquee-duration. Zero JS, zero listeners,
 *  respects prefers-reduced-motion via globals.css. */
export function ClientMarquee() {
  const sized = CLIENT_LOGOS.map((logo) => ({ ...logo, ...fit(logo.src.width, logo.src.height) }));
  const track = [...sized, ...sized];
  return (
    <div className="marquee" aria-label="Selected MEC clients">
      <div className="marquee-track">
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="marquee-item"
            style={{ width: logo.width, height: MAX_HEIGHT }}
            aria-hidden={i >= sized.length}
          >
            <Image
              src={logo.src}
              alt={i < sized.length ? logo.name : ''}
              width={logo.width}
              height={logo.height}
              sizes={`${logo.width}px`}
              // The track scrolls, so lazy loading pops logos in at the right
              // edge and leaves gaps. They are tiny; fetch them behind the hero.
              loading="eager"
              fetchPriority="low"
              className="object-contain"
              style={{ width: logo.width, height: logo.height }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

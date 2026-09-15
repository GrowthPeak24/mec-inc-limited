import type { MediaRef } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';

/** Service-page field photography. CSS-columns masonry so mixed portrait
 *  and landscape shots render at their intrinsic aspect ratio, uncropped.
 *  Zero client JS. */
export function SetupGallery({ gallery }: { gallery: readonly MediaRef[] }) {
  if (gallery.length === 0) return null;
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3 lg:gap-6">
      {gallery.map((m) => (
        <figure
          key={m.alt}
          className="mb-4 break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)] lg:mb-6"
        >
          <MediaImage
            media={m}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full"
          />
        </figure>
      ))}
    </div>
  );
}

import type { MediaRef } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';

export function ProjectGallery({ gallery }: { gallery: readonly MediaRef[] }) {
  if (gallery.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {gallery.map((m) => (
        <figure
          key={m.alt}
          className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)]"
        >
          <MediaImage
            media={m}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}

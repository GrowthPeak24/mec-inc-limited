import Image, { type ImageProps } from 'next/image';
import type { MediaRef } from '@/types/content';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  media: MediaRef;
  /** Explicit sizes hint — always pass this so next/image picks the right srcset. */
  sizes: string;
};

/** Thin wrapper that unpacks a MediaRef and preserves intrinsic
 *  dimensions + automatic blurDataURL. Always static-imported source. */
export function MediaImage({ media, sizes, className, ...rest }: Props) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      sizes={sizes}
      placeholder="blur"
      className={className}
      style={media.focal ? { objectPosition: media.focal } : undefined}
      {...rest}
    />
  );
}

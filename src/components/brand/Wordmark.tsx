import Image from 'next/image';
import logo from '@/assets/logos/logo.png';

type Props = {
  className?: string;
  /** Constrains the rendered height. Width scales by intrinsic aspect ratio. */
  height?: number;
  /** LCP hint — pass true for the header logo. */
  priority?: boolean;
};

/** Static brand mark. Uses the client-supplied blue-on-transparent PNG.
 *  The mark is dark sapphire, so surrounding surfaces should be light
 *  (paper/sand). Dark surfaces require a light backdrop container. */
export function Wordmark({ className, height = 32, priority = false }: Props) {
  const width = Math.round((logo.width / logo.height) * height);
  return (
    <Image
      src={logo}
      alt="MEC Inc. Limited"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={`h-auto w-auto object-contain ${className ?? ''}`}
      style={{ height, width: 'auto' }}
    />
  );
}

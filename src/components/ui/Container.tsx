import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <Tag className={clsx('container-x', className)}>{children}</Tag>;
}

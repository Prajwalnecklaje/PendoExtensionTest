import { cn } from './cn'

export function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton rounded-lg', className)} {...props} />
}

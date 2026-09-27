import { cn } from './cn'

const sizes = {
  xs: 'h-6 w-6 text-[9px]',
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-16 w-16 text-lg',
}

export function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'
}

export function Avatar({ src, alt, name, size = 'md', className, status, ...props }) {
  return (
    <span className={cn('relative inline-flex shrink-0', sizes[size] || sizes.md, className)} {...props}>
      {src ? <img src={src} alt={alt || name || ''} className="h-full w-full rounded-full object-cover ring-2 ring-[var(--surface)]" /> : <span aria-label={alt || name} className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-bold text-white ring-2 ring-[var(--surface)]">{initials(name)}</span>}
      {status && <span className={cn('absolute bottom-0 right-0 h-[28%] w-[28%] rounded-full border-2 border-[var(--surface)]', status === 'online' ? 'bg-emerald-500' : status === 'away' ? 'bg-amber-400' : 'bg-ink-400')} aria-label={`Status: ${status}`} />}
    </span>
  )
}

export function AvatarGroup({ users = [], max = 4, size = 'sm', className }) {
  const visible = users.slice(0, max)
  const extra = users.length - visible.length
  return (
    <div className={cn('flex -space-x-2', className)}>
      {visible.map((user) => <Avatar key={user.id || user.email || user.name} {...user} size={size} className="ring-2 ring-[var(--surface)]" />)}
      {extra > 0 && <span className={cn('relative flex items-center justify-center rounded-full bg-ink-100 font-semibold text-ink-600 ring-2 ring-[var(--surface)] dark:bg-ink-800 dark:text-ink-300', sizes[size] || sizes.sm)}>+{extra}</span>}
    </div>
  )
}

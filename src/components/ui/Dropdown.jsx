import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from './cn'

export function Dropdown({ trigger, children, align = 'right', className, contentClassName, id = 'dropdown-menu' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const toggle = () => setOpen((value) => !value)
  const renderedTrigger = typeof trigger === 'function'
    ? trigger({ open, toggle, close: () => setOpen(false) })
    : isValidElement(trigger)
      ? cloneElement(trigger, {
        'aria-expanded': open,
        'aria-haspopup': 'menu',
        onClick: (event) => {
          trigger.props.onClick?.(event)
          if (!event.defaultPrevented) toggle()
        },
      })
      : trigger

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {renderedTrigger}
      {open && (
        <div
          id={id}
          role="menu"
          className={cn('absolute z-50 mt-2 min-w-48 origin-top overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-float animate-scale-in', align === 'left' ? 'left-0' : 'right-0', contentClassName)}
        >
          {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ icon: Icon, children, destructive = false, active = false, className, onClick, disabled, ...props }) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-subtle)] disabled:cursor-not-allowed disabled:opacity-50', destructive && 'text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30', className)}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />}
      <span className="min-w-0 flex-1">{children}</span>
      {active && <Check className="h-4 w-4 text-brand-600 dark:text-brand-300" aria-hidden="true" />}
    </button>
  )
}

export function DropdownDivider({ className }) {
  return <div className={cn('my-1.5 border-t border-[var(--line)]', className)} role="separator" />
}

export function DropdownLabel({ children, className }) {
  return <div className={cn('px-2.5 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-400', className)}>{children}</div>
}

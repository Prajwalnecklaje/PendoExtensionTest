import { cn } from './cn'

const positions = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

export function Tooltip({ content, children, position = 'top', className, disabled = false }) {
  if (!content || disabled) return children
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span role="tooltip" className={cn('pointer-events-none absolute z-[70] w-max max-w-56 rounded-lg bg-ink-900 px-2.5 py-1.5 text-xs font-medium leading-4 text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-ink-100 dark:text-ink-900', positions[position] || positions.top, className)}>
        {content}
      </span>
    </span>
  )
}

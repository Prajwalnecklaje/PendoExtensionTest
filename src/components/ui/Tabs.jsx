import { useEffect, useId, useState } from 'react'
import { cn } from './cn'

export function Tabs({ tabs = [], value, defaultValue, onValueChange, className, tabListClassName, contentClassName, id }) {
  const generatedId = useId()
  const tabsId = id || `tabs-${generatedId}`
  const initialValue = defaultValue || tabs.find((tab) => !tab.disabled)?.value
  const [internalValue, setInternalValue] = useState(initialValue)
  const activeValue = value ?? internalValue
  const activeTab = tabs.find((tab) => tab.value === activeValue) || tabs[0]

  useEffect(() => {
    if (value === undefined && !tabs.some((tab) => tab.value === internalValue)) setInternalValue(initialValue)
  }, [value, tabs, internalValue, initialValue])

  const select = (next) => {
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label="Content sections" className={cn('flex max-w-full gap-1 overflow-x-auto border-b border-[var(--line)]', tabListClassName)}>
        {tabs.map((tab) => {
          const selected = tab.value === activeValue
          return (
            <button
              key={tab.value}
              id={`${tabsId}-${tab.value}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabsId}-${tab.value}-panel`}
              disabled={tab.disabled}
              onClick={() => select(tab.value)}
              className={cn('relative inline-flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40', selected && 'text-brand-700 dark:text-brand-300 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-600')}
            >
              {tab.icon && <tab.icon className="h-4 w-4" aria-hidden="true" />}
              {tab.label}
              {tab.count !== undefined && <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">{tab.count}</span>}
            </button>
          )
        })}
      </div>
      {activeTab && (
        <div id={`${tabsId}-${activeTab.value}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${activeTab.value}`} className={cn('animate-fade-in', contentClassName)}>
          {typeof activeTab.content === 'function' ? activeTab.content() : activeTab.content}
        </div>
      )}
    </div>
  )
}

export function SegmentedControl({ options, value, onValueChange, className, label = 'Options' }) {
  return (
    <div className={cn('inline-flex rounded-xl bg-ink-100 p-1 dark:bg-ink-800', className)} role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            onClick={() => onValueChange?.(option.value)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-500 transition disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-300', selected && 'bg-[var(--surface)] text-[var(--text)] shadow-sm')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

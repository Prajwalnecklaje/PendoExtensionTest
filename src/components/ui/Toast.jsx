import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { IconButton } from './Button'
import { cn } from './cn'

const ToastContext = createContext(null)

const tone = {
  success: { icon: CheckCircle2, className: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/60 dark:text-emerald-100', iconClass: 'text-emerald-600 dark:text-emerald-400' },
  error: { icon: XCircle, className: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/70 dark:bg-rose-950/60 dark:text-rose-100', iconClass: 'text-rose-600 dark:text-rose-400' },
  warning: { icon: AlertCircle, className: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/60 dark:text-amber-100', iconClass: 'text-amber-600 dark:text-amber-400' },
  info: { icon: Info, className: 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-900/70 dark:bg-brand-900/35 dark:text-brand-100', iconClass: 'text-brand-600 dark:text-brand-300' },
}

export function ToastProvider({ children, limit = 4 }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id)
    if (timer) window.clearTimeout(timer)
    timers.current.delete(id)
    setToasts((items) => items.filter((item) => item.id !== id))
  }, [])

  const push = useCallback((message, options = {}) => {
    const item = typeof message === 'object' ? message : { message, ...options }
    const id = item.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const next = { type: 'info', duration: 4200, ...item, id }
    setToasts((items) => [...items.filter((current) => current.id !== id), next].slice(-limit))
    if (next.duration !== Infinity && next.duration !== 0) {
      const timer = window.setTimeout(() => dismiss(id), next.duration)
      timers.current.set(id, timer)
    }
    return id
  }, [dismiss, limit])

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current.clear()
  }, [])

  const toast = useMemo(() => {
    const notify = (message, options) => push(message, options)
    notify.success = (message, options) => push(message, { ...options, type: 'success' })
    notify.error = (message, options) => push(message, { ...options, type: 'error' })
    notify.warning = (message, options) => push(message, { ...options, type: 'warning' })
    notify.info = (message, options) => push(message, { ...options, type: 'info' })
    notify.dismiss = dismiss
    return notify
  }, [dismiss, push])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>.')
  return context
}

export function ToastViewport({ toasts, onDismiss }) {
  return (
    <div id="toast-region" aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:w-full">
      {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />)}
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  const config = tone[toast.type] || tone.info
  const Icon = config.icon
  return (
    <article id={toast.id} className={cn('pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-float animate-slide-in', config.className)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconClass)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {toast.title && <h4 className="text-sm font-semibold">{toast.title}</h4>}
        <p className={cn('text-sm leading-5', toast.title && 'mt-0.5')}>{toast.message}</p>
        {toast.action && <button type="button" onClick={toast.action.onClick} className="mt-2 text-xs font-bold underline underline-offset-2">{toast.action.label}</button>}
      </div>
      <IconButton label="Dismiss notification" size="xs" className="-mr-1 -mt-1 !h-7 !w-7 opacity-70 hover:opacity-100" onClick={() => onDismiss(toast.id)}>
        <X className="h-3.5 w-3.5" />
      </IconButton>
    </article>
  )
}

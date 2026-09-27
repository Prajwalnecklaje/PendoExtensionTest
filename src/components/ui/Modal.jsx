import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button, IconButton } from './Button'
import { cn } from './cn'

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  closeOnOverlay = true,
  showClose = true,
  labelledBy,
  id,
}) {
  const reactId = useId()
  const titleId = labelledBy || id || `modal-title-${reactId}`

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) onClose?.()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn('max-h-[calc(100dvh-1.5rem)] w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-float animate-scale-in sm:max-h-[calc(100dvh-3rem)]', sizes[size] || sizes.md, className)}
      >
        {(title || description || showClose) && (
          <header className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 sm:px-6">
            <div className="min-w-0">
              {title && <h2 id={titleId} className="text-base font-semibold tracking-[-0.01em] text-[var(--text)]">{title}</h2>}
              {description && <p className="mt-1 text-sm leading-5 text-[var(--muted)]">{description}</p>}
            </div>
            {showClose && <IconButton id="modal-close-button" label="Close dialog" size="sm" onClick={onClose}><X className="h-4 w-4" /></IconButton>}
          </header>
        )}
        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto px-5 py-5 sm:max-h-[calc(100dvh-15rem)] sm:px-6">{children}</div>
        {footer && <footer className="flex flex-col-reverse justify-end gap-2 border-t border-[var(--line)] px-5 py-4 sm:flex-row sm:px-6">{footer}</footer>}
      </section>
    </div>,
    document.body,
  )
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={(
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading} id="confirm-dialog-action">{confirmLabel}</Button>
        </>
      )}
    >
      {children}
    </Modal>
  )
}

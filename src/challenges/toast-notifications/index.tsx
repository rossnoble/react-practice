import { useState, useRef } from 'react'

type Variant = 'info' | 'success' | 'error' | 'warning'

type Position = 'top-left' | 'top-right'

type Toast = {
  id: number
  message: string
  position?: Position
  variant?: Variant
  duration?: number
  // isOpen?: boolean
  onClose?: () => void
}

export function Toast({ toast }: { toast: Toast }) {
  const { message, position = 'top-right', variant = 'info', onClose } = toast

  const getPositionStyles = (position: Position) => {
    const styles: Record<Position, string> = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
    }

    return styles[position] ?? ''
  }

  const getVariantStyles = (variant: Variant) => {
    const styles: Record<Variant, string> = {
      info: 'border-blue-400 bg-blue-100 ',
      success: 'border-green-400 bg-green-100',
      error: 'border-red-400 bg-red-100',
      warning: 'border-orange-400 bg-orange-100',
    }

    return styles[variant] ?? ''
  }

  return (
    <div
      data-id={toast.id}
      style={{ zIndex: 1000 + toast.id }}
      className={`${getPositionStyles(position)} ${getVariantStyles(variant)} fixed flex min-w-[300px] items-center justify-between rounded-md border px-6 py-4 shadow-md`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="flex size-4 items-center justify-center rounded-sm border bg-gray-100 text-xs hover:bg-gray-300"
      >
        ✕
      </button>
    </div>
  )
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdRef = useRef(0)

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = ++toastIdRef.current
    const newToast = {
      id,
      ...toast,
      onClose: () => removeToast(id),
    }

    setToasts(prev => [newToast, ...prev])

    // Close toast if a duration is passed
    if (toast.duration) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }
  }

  const removeToast = (toastId: number) => {
    setToasts(prev => prev.filter(t => toastId !== t.id))
  }

  return {
    toasts,
    showToast,
  }
}

export function ToastNotifications() {
  const { showToast, toasts } = useToast()
  console.log({ toasts })

  return (
    <div>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
      <div className="flex-cols flex gap-2">
        <button
          onClick={() =>
            showToast({ message: 'This is a message 1', duration: 1000 })
          }
          className="button"
        >
          Trigger toast 1
        </button>
        <button
          onClick={() =>
            showToast({ variant: 'warning', message: 'This is a message 2' })
          }
          className="button"
        >
          Trigger toast 2
        </button>
      </div>
    </div>
  )
}

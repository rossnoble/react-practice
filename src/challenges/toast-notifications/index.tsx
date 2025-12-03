import {
  useState,
  useRef,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'

type Variant = 'info' | 'success' | 'error' | 'warning'

type Position = 'top-left' | 'top-right'

type Toast = {
  id: number
  message?: string
  position?: Position
  variant?: Variant
  duration?: number
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

type ToastContext = {
  toasts: Toast[]
  showToast: (toast: Partial<Toast>) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContext | undefined>(undefined)

const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdRef = useRef(0)

  const showToast = (toast: Partial<Toast>) => {
    const id = ++toastIdRef.current
    const newToast: Toast = {
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

  const contextValue = {
    toasts,
    showToast,
    removeToast,
  }

  return (
    <ToastContext value={contextValue}>
      {children}
      <div data-id="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext>
  )
}

function ToastControls() {
  const { showToast } = useToast()

  return (
    <div className="flex-cols flex gap-2">
      <button
        onClick={() =>
          showToast({
            message: 'This message will disappear',
            duration: 3000,
            position: 'top-left',
          })
        }
        className="button"
      >
        Trigger toast 1
      </button>
      <button
        onClick={() =>
          showToast({
            variant: 'warning',
            message: 'This message will persist',
          })
        }
        className="button"
      >
        Trigger toast 2
      </button>
    </div>
  )
}

export function ToastNotifications() {
  return (
    <ToastProvider>
      <ToastControls />
    </ToastProvider>
  )
}

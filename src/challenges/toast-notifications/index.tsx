import {
  useState,
  useRef,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'

type Toast = {
  id: number
  message?: string
  position?: Position
  variant?: Variant
  duration?: number
  onClose?: () => void
}

const VARIANTS = ['info', 'success', 'error', 'warning']
type Variant = (typeof VARIANTS)[number]

const POSITIONS = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const
type Position = (typeof POSITIONS)[number]

export function Toast({ toast }: { toast: Toast }) {
  const {
    message,
    position = 'top-right',
    variant = 'info',
    duration,
    onClose,
  } = toast

  const getPositionStyles = (position: Position) => {
    const styles: Record<Position, string> = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
    }

    return styles[position] ?? ''
  }

  const getContainerStyles = (variant: Variant) => {
    const styles: Record<Variant, string> = {
      info: 'border-blue-400 bg-blue-100',
      success: 'border-green-400 bg-green-100',
      error: 'border-red-400 bg-red-100',
      warning: 'border-orange-400 bg-orange-100',
    }

    return styles[variant] ?? ''
  }

  const getButtonStyles = (variant: Variant) => {
    const baseStyles = getContainerStyles(variant)

    const buttonStyles: Record<Variant, string> = {
      info: 'text-blue-400 hover:bg-blue-200',
      success: 'text-green-400 hover:bg-green-200',
      error: 'text-red-400 hover:bg-red-200',
      warning: 'text-orange-400 bg-orange-100 hover:bg-orange-200',
    }

    const buttonColor = buttonStyles[variant] ?? ''

    return [baseStyles, buttonColor].join(' ').trim()
  }

  return (
    <div
      data-id={toast.id}
      style={{ zIndex: 1000 + toast.id }}
      className={`${getPositionStyles(position)} ${getContainerStyles(variant)} fixed flex min-w-[300px] justify-between gap-4 rounded-md border px-3 py-3 shadow-md`}
    >
      <div className="px-3 py-1">
        <p>{message}</p>
        <p className="text-xs text-gray-700">
          {duration
            ? `This message will disappear in ${duration / 1000} seconds`
            : 'This message will not disappear unless closed'}
        </p>
      </div>

      <div>
        <button
          onClick={onClose}
          className={`flex size-4 items-center justify-center rounded-sm border text-xs ${getButtonStyles(variant)}`}
        >
          ✕
        </button>
      </div>
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

// [0, ...1000-5000]
const durationOptions = Array.from({ length: 6 }).map((_, idx) => idx * 1000)

function ToastControls() {
  const { showToast, toasts } = useToast()
  const [variant, setVariant] = useState<Variant>('error')
  const [position, setPosition] = useState<Position>('top-right')
  const [duration, setDuration] = useState(4000)

  return (
    <div>
      <p className="mb-8">There are {toasts.length} toasts active.</p>

      <div className="flex justify-between rounded-md border border-gray-300 bg-gray-100 p-4 shadow-sm">
        <div className="flex-cols flex gap-2">
          <select
            id="variant"
            className="border border-gray-300 bg-gray-50 p-2"
            value={variant}
            onChange={ev => setVariant(ev.target.value as Variant)}
          >
            {VARIANTS.map(variant => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>

          <select
            id="position"
            className="border border-gray-300 bg-gray-50 p-2"
            value={position}
            onChange={ev => setPosition(ev.target.value as Position)}
          >
            {POSITIONS.map(position => (
              <option value={position}>{position}</option>
            ))}
          </select>

          <select
            id="position"
            className="border border-gray-300 bg-gray-50 p-2"
            value={duration}
            onChange={ev => setDuration(parseInt(ev.target.value))}
          >
            {durationOptions.map(dur => (
              <option key={`duration-${dur}`} value={dur}>
                {dur}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            showToast({
              message: `Unix time: ${new Date().getTime()}`,
              duration,
              position,
              variant,
            })
          }
          className="button"
        >
          Trigger toast
        </button>
      </div>
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

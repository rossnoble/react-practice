import { useState, useRef, useEffect } from 'react'

type Variant = 'info' | 'success' | 'error' | 'warning'

type Position = 'top-left' | 'top-right'

type ToastProps = {
  message: string
  position?: Position
  variant?: Variant
  isOpen: boolean
  onClose: () => void
}

export function Toast(props: ToastProps) {
  const {
    isOpen = false,
    message,
    position = 'top-right',
    variant = 'info',
    onClose,
  } = props

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

  if (!isOpen) return null

  return (
    <div
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
  const [showToast, setShowToast] = useState(false)
  const [variant, setVariant] = useState<Variant>('info')
  const [message, setMessage] = useState('')

  const onClose = () => setShowToast(false)

  const timeoutRef = useRef(0)

  useEffect(() => {
    if (!showToast) return

    timeoutRef.current = setTimeout(() => {
      setShowToast(false)
    }, 2000)

    return () => {
      timeoutRef.current = 0
    }
  }, [showToast])

  return {
    toast: (
      <Toast
        message={message}
        variant={variant}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    ),
    showToast: ({
      message,
      variant,
    }: Partial<Pick<ToastProps, 'message' | 'variant'>>) => {
      if (message) setMessage(message)
      if (variant) setVariant(variant)
      setShowToast(true)
    },
    onClose,
  }
}

export function ToastNotifications() {
  const { showToast, toast } = useToast()

  return (
    <div>
      {toast}
      <button
        onClick={() => showToast({ message: 'This is a message 1' })}
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
  )
}

type Variant = 'info' | 'success' | 'error' | 'warning'

import { useState, useRef, useEffect } from 'react'

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

  const timeoutRef = useRef(0)

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

  useEffect(() => {
    if (!isOpen) return

    timeoutRef.current = setTimeout(() => {
      onClose?.()
    }, 2000)

    return () => {
      timeoutRef.current = 0
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`${getPositionStyles(position)} ${getVariantStyles(variant)} fixed rounded-md border px-6 py-4 shadow-md`}
    >
      {message}
    </div>
  )
}

const useToast = () => {
  const [showToast, setShowToast] = useState(false)
  const [variant, setVariant] = useState<Variant>('info')
  const [message, setMessage] = useState('')

  const onClose = () => setShowToast(false)

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

export function ToastContainer() {
  const { toast, showToast } = useToast()

  return (
    <div>
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

      {toast}
    </div>
  )
}

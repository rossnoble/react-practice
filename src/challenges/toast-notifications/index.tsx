// type Variant = "info" | "success" | "error" | "warning"

import { useState } from 'react'

type Position = 'top-left' | 'top-right'

type ToastProps = {
  message: string
  isOpen?: boolean
  position?: Position
}

export function Toast(props: ToastProps) {
  const { message, isOpen = false, position = 'top-right' } = props

  if (!isOpen) return null

  const getPositionStyles = (position: Position) => {
    const styles: Record<Position, string> = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
    }

    return styles[position] ?? ''
  }

  return (
    <div
      className={`${getPositionStyles(position)} fixed rounded-md border border-blue-400 bg-blue-100 px-6 py-4 shadow-md`}
    >
      {message}
    </div>
  )
}

export function ToastContainer() {
  const [showToast, setShowToast] = useState(false)

  return (
    <div>
      <button onClick={() => setShowToast(prev => !prev)} className="button">
        Trigger toast
      </button>
      <Toast message="This is a notification message" isOpen={showToast} />
    </div>
  )
}

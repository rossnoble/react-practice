import { useState } from 'react'

type ClickCounterProps = {
  minCount?: number
  maxCount?: number
}

export function ClickCounter({
  minCount = -5,
  maxCount = 5,
}: ClickCounterProps) {
  const [clickCount, setClickCount] = useState(0)

  const handleIncrement = () => {
    // Increment count unless above max
    setClickCount(Math.min(maxCount, clickCount + 1))
  }

  const handleDecrement = () => {
    // Decrement count unless below min
    setClickCount(Math.max(minCount, clickCount - 1))
  }

  const handleReset = () => setClickCount(0)

  return (
    <div>
      <p className="mb-6 text-4xl font-bold text-gray-700">{clickCount}</p>

      <div className="flex flex-col gap-2 md:flex-row">
        <button
          onClick={handleIncrement}
          className="rounded bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500"
          disabled={clickCount === maxCount}
        >
          Increment (+)
        </button>
        <button
          onClick={handleDecrement}
          className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500"
          disabled={clickCount === minCount}
        >
          Decrement (-)
        </button>
        <button
          onClick={handleReset}
          className="rounded bg-gray-500 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600 md:ml-auto"
        >
          Reset count
        </button>
      </div>
    </div>
  )
}

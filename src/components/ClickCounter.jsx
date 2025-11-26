import { useState } from 'react'

export function ClickCounter({ minCount = 0, maxCount = 10 }) {
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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Click counter</h2>
      <p className="text-gray-600 mb-4">
        Click on the buttons to increase, decrease and reset the counter.
      </p>
      <p className="text-4xl font-bold text-gray-700 mb-6">{clickCount}</p>

      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={handleIncrement}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Increment (+)
        </button>
        <button
          onClick={handleDecrement}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Decrement (-)
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors md:ml-auto"
        >
          Reset count
        </button>
      </div>
    </div>
  )
}

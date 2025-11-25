import { useState } from 'react'

const MAX_COUNT = 10
const MIN_COUNT = -5

function ExampleCard() {
  const [clickCount, setClickCount] = useState(0)

  const handleIncrement = () => {
    setClickCount(Math.min(MAX_COUNT, clickCount + 1))
  }

  const handleDecrement = () => {
    // Decreate count but do not permit negative values
    setClickCount(Math.max(MIN_COUNT, clickCount - 1))
  }
  const handleReset = () => setClickCount(0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Click counter</h2>
      <p className="text-gray-600 mb-4">
        Click on the buttons to increase, decrease and reset the counter.
      </p>
      <p className="text-gray-700 mb-6 border-2 border-dashed border-gray-300 p-2">
        Number of clicks: {clickCount}
      </p>

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

export default ExampleCard

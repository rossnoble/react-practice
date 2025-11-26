import { useState } from 'react'

export function DateInput() {
  const [selectedDate, setSelectedDate] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Date Picker</h2>
      <div className="space-y-4">
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {selectedDate && (
          <p className="text-gray-600">
            Selected: <span className="font-medium">{selectedDate}</span>
          </p>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'

export function TemperatureConverter() {
  const [tempC, setTempC] = useState('')
  const [tempF, setTempF] = useState('')

  const handleCelsiusUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const celsiusValue = ev.target.value
    setTempC(celsiusValue)

    const celciusNum = parseFloat(celsiusValue)
    if (typeof celciusNum === 'number' && !isNaN(celciusNum)) {
      const convertedF = (celciusNum * 9) / 5 + 32
      setTempF(String(round(convertedF)))
    } else {
      setTempF('')
    }
  }

  const handleFahrenheitUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const fahrenheitValue = ev.target.value
    setTempF(fahrenheitValue)

    const fahrenheitNum = parseFloat(fahrenheitValue)
    if (typeof fahrenheitNum === 'number' && !isNaN(fahrenheitNum)) {
      const convertedC = ((fahrenheitNum - 32) * 5) / 9
      setTempC(String(round(convertedC)))
    } else {
      setTempC('')
    }
  }

  const getFieldStateStyles = (val: string) => {
    return val === '' || isValidFloat(val)
      ? 'border-gray-300'
      : 'border-red-300 outline outline-red-300'
  }

  return (
    <div className="flex gap-6">
      <div className="flex flex-auto flex-col justify-between border border-gray-300 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800">
        <label htmlFor="celsius" className="p-1 text-center dark:text-gray-100">
          Celsius
        </label>
        <input
          id="celsius"
          type="text"
          value={tempC}
          onChange={handleCelsiusUpdate}
          className={`border bg-white p-1 py-2 text-center text-4xl dark:bg-gray-900 dark:text-white ${getFieldStateStyles(tempC)} w-full dark:border-gray-700`}
        />
      </div>

      <p className="flex flex-none items-end pb-3 text-2xl leading-none font-bold">
        =
      </p>

      <div className="flex flex-auto flex-col justify-between border border-gray-300 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800">
        <label htmlFor="fahrenheit" className="p-1 text-center">
          Fahrenheit
        </label>
        <input
          id="fahrenheit"
          type="text"
          value={tempF}
          onChange={handleFahrenheitUpdate}
          className={`border bg-white p-1 py-2 text-center text-4xl dark:bg-gray-900 dark:text-white ${getFieldStateStyles(tempF)} w-full dark:border-gray-700`}
        />
      </div>
    </div>
  )
}

function round(num: number): number {
  return Math.round(num * 100) / 100
}

function isValidFloat(val: string) {
  const possible = parseFloat(val)
  return typeof possible === 'number' && !isNaN(possible)
}

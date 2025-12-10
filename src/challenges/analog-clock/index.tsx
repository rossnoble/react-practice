import { useEffect, useState } from 'react'

const DEGREES_PER_HOUR = 30 // = 360 / 12
const DEGREES_PER_MINUTE = 6 // = 360 / 60
const DEGREES_PER_SECOND = 6 // 360 / 60

type Props = {
  size?: number
  tick?: number
}

export function AnalogClock({ size = 250, tick = 100 }: Props) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, tick)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const hours = date.getHours() % 12
  const minutes = date.getMinutes()
  // Get fractional seconds
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000

  const hourHandRotation = hours * DEGREES_PER_HOUR
  const minuteHandRotation = minutes * DEGREES_PER_MINUTE
  const secondHandRotation = seconds * DEGREES_PER_SECOND

  // TODO: Calculate how much to rotate each hand in degrees
  return (
    <div className="w-fit rounded-full border-10 border-gray-300 shadow-sm/40">
      <div
        className="relative flex items-center justify-center rounded-full bg-black"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* markers */}
        <p className="absolute top-2 w-full text-center text-xl text-white">
          12
        </p>
        <p className="absolute right-3 flex h-full items-center text-xl text-white">
          3
        </p>
        <p className="absolute bottom-2 w-full text-center text-xl text-white">
          6
        </p>
        <p className="absolute left-3 flex h-full items-center text-xl text-white">
          9
        </p>

        <div
          data-id="hours"
          className="absolute h-full w-full"
          style={{ transform: `rotate(${hourHandRotation}deg)` }}
        >
          <div
            className="absolute top-[20%] z-20 h-[30%] w-[6px] bg-yellow-500"
            style={{ left: `calc((${size}px - 6px) / 2)` }}
          />
        </div>
        <div className="absolute z-20 size-[12px] rounded-full bg-yellow-500" />

        <div
          data-id="minutes"
          className="absolute z-30 h-full w-full"
          style={{ transform: `rotate(${minuteHandRotation}deg)` }}
        >
          <div
            className="absolute top-[7%] h-[43%] w-[3px] bg-red-500"
            style={{ left: `calc((${size}px - 3px) / 2 )` }}
          />
        </div>
        <div className="absolute z-30 size-[10px] rounded-full bg-red-500" />

        <div
          data-id="seconds"
          className="absolute z-40 h-full w-full"
          style={{ transform: `rotate(${secondHandRotation}deg)` }}
        >
          <div
            className="absolute top-[2%] h-[55%] w-[1px] bg-green-500"
            style={{ left: `calc((${size}px - 1px) / 2 )` }}
          />
        </div>
        <div className="absolute z-40 size-[8px] rounded-full bg-green-500" />
      </div>
    </div>
  )
}

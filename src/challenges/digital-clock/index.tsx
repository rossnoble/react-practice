import { useEffect, useState } from 'react'

type Display = 'numeric' | 'seven-segment'

type Props = {
  display?: Display
}

export function DigitalClock({ display = 'numeric' }: Props) {
  const [time, setTime] = useState(new Date())
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  useEffect(() => {
    setHours(time.getHours())
    setMinutes(time.getMinutes())
    setSeconds(time.getSeconds())
  }, [time])

  const pad = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  if (display === 'seven-segment') {
    return (
      <div className="inline-block rounded-md border-4 border-orange-900">
        <p className="bg-orange-100 p-2 text-5xl font-bold text-black">
          <time dateTime={time.toTimeString()}>
            <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
            <span>{pad(seconds)}</span>
          </time>
        </p>
      </div>
    )
  }

  return (
    <div className="inline-block rounded-md border-4 border-orange-900">
      <div className="border-4 border-orange-400">
        <div className="border border-amber-800">
          <p className="bg-orange-100 p-2 text-5xl font-bold text-black">
            <time dateTime={time.toTimeString()}>
              <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
              <span>{pad(seconds)}</span>
            </time>
          </p>
        </div>
      </div>
    </div>
  )
}

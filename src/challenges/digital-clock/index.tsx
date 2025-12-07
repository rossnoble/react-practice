import { useEffect, useState } from 'react'

export function DigitalClock() {
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

  return (
    <SegmentClock
      time={time}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  )
}

function toIntArray(num: number) {
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map(n => parseInt(n))
}

type ClockProps = {
  time: Date
  hours: number
  minutes: number
  seconds: number
}

function SegmentClock({ hours, minutes, seconds }: ClockProps) {
  const timeString = [
    hours.toString().padStart(2, '0'),
    ':',
    minutes.toString().padStart(2, '0'),
    ':',
    seconds.toString().padStart(2, '0'),
  ].join('')

  return (
    <time
      dateTime={timeString}
      className="flex size-fit gap-1 rounded-md border-10 border-gray-500 bg-gray-950 p-4"
    >
      {toIntArray(hours).map(n => (
        <Digit num={n} />
      ))}
      <Colon />
      {toIntArray(minutes).map(n => (
        <Digit num={n} />
      ))}
      <Colon />
      {toIntArray(seconds).map(n => (
        <Digit num={n} />
      ))}
    </time>
  )
}

type Cell = {
  w: number
  h: number
  id?: string
}

const SEGMENT_PATTERNS: Record<number, string> = {
  0: 'ABCDEF',
  1: 'BC',
  2: 'ABDEG',
  3: 'ABCDG',
  4: 'BCFG',
  5: 'ACDFG',
  6: 'ACDEFG',
  7: 'ABC',
  8: 'ABCDEFG',
  9: 'ABCFG',
}

function getSegments(num: number): string[] {
  const lookup = SEGMENT_PATTERNS[num]
  if (lookup) return lookup.split('')
  return []
}

function Colon({
  size = 7,
  color = 'bg-orange-500',
}: {
  size?: number
  color?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-transparent p-1">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`${color} rounded-xs`}
      />
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`${color} rounded-xs`}
      />
    </div>
  )
}

type DigitProps = {
  num: number
  size?: number
  short?: number
  long?: number
  color?: string
}

function Digit({
  num,
  size = 7,
  short = 1,
  long = 4,
  color = 'bg-orange-500',
}: DigitProps) {
  const outlines: Cell[][] = [
    [
      { w: short, h: short },
      { w: long, h: short, id: 'A' },
      { w: short, h: short },
    ],
    [
      { w: short, h: long, id: 'F' },
      { w: long, h: long },
      { w: short, h: long, id: 'B' },
    ],
    [
      { w: short, h: short },
      { w: long, h: short, id: 'G' },
      { w: short, h: short },
    ],
    [
      { w: short, h: long, id: 'E' },
      { w: long, h: long },
      { w: short, h: long, id: 'C' },
    ],
    [
      { w: short, h: short },
      { w: long, h: short, id: 'D' },
      { w: short, h: short },
    ],
  ]

  const segments = getSegments(num)

  const bgColor = (id?: string) => {
    if (id && segments.includes(id)) {
      return color
    } else if (id) {
      return 'bg-gray-800'
    }
    return 'bg-black'
  }

  return (
    <div className="flex size-fit -skew-x-6 flex-col gap-0.5 bg-transparent p-1">
      {outlines.map(row => (
        <div className="flex gap-0.5">
          {row.map(line => (
            <div
              data-id={line.id}
              style={{
                width: `${line.w * size}px`,
                height: `${line.h * size}px`,
              }}
              className={`${bgColor(line.id)} rounded-xs`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

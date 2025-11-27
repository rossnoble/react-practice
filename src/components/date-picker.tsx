import { useState } from 'react'

const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
const DAYS_OF_WEEK_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const MONTHS_IN_YEAR = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getDayOfWeekPosition(year: number, month: number, day: number): number {
  return new Date(year, month, day).getDay()
}

function getDayOfWeek(year: number, month: number, day: number): string {
  return DAYS_OF_WEEK_FULL[getDayOfWeekPosition(year, month, day)]
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthName(monthPos: number): string {
  return MONTHS_IN_YEAR[monthPos]
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDay()
}

type DatePickerProps = {
  today?: Date
}

export function DatePicker({ today = new Date() }: DatePickerProps) {
  const [day, setDay] = useState(today.getDate())
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const dayOfWeek = getDayOfWeek(year, month, day)
  const daysInMonth = getDaysInMonth(year, month)

  const handleChangeMonth = (value: string) => {
    if (parseInt(value) <= MONTHS_IN_YEAR.length - 1) {
      setMonth(parseInt(value))
    }
  }

  const handleChangeDay = (value: string) => {
    const valueInt = parseInt(value)

    if (valueInt > daysInMonth) {
      setDay(1)
      setMonth(month + 1)
    } else if (valueInt < 1) {
      setDay(getDaysInMonth(year, month - 1))
      setMonth(month - 1)
    } else {
      setDay(valueInt)
    }
  }

  const handleDateClick = (date: number) => setDay(date)

  return (
    <div className="flex flex-col gap-6 max-w-[70%]">
      <div className="flex flex-row gap-4">
        <div>
          <label htmlFor="year" className="mr-2">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={ev => setYear(parseInt(ev.target.value))}
            className="border-1 border-gray-300 py-1 px-2 w-[80px]"
          />
        </div>
        <div>
          <label htmlFor="month" className="mr-2">
            Month
          </label>
          <input
            type="number"
            id="month"
            name="month"
            value={month}
            onChange={ev => handleChangeMonth(ev.target.value)}
            className="border-1 border-gray-300 py-1 px-2 w-[80px]"
          />
        </div>
        <div>
          <label htmlFor="year" className="mr-2">
            Day
          </label>
          <input
            type="number"
            id="day"
            name="day"
            value={day}
            onChange={ev => handleChangeDay(ev.target.value)}
            className="border-1 border-gray-300 py-1 px-2 w-[80px]"
          />
        </div>
      </div>

      <div>
        <p className="text-xs uppercase mb-1">{dayOfWeek}</p>
        <p className="text-2xl font-bold">
          {getMonthName(month)} {day}, {year}
        </p>
      </div>
      <Calendar year={year} month={month} day={day} handleDateClick={handleDateClick} />
      <MetaData year={year} month={month} day={day} />
    </div>
  )
}

const getCalendarGrid = (offset: number = 0, daysInMonth: number): (number | null)[] => {
  const items = new Array(offset + daysInMonth).fill(null)

  for (let i = 1; i <= daysInMonth; i++) {
    items[i + offset] = i
  }

  return items
}

interface CalendarProps {
  year: number
  month: number
  day: number
  handleDateClick: (date: number) => void
}

function Calendar({ year, month, day, handleDateClick }: CalendarProps) {
  const position = getFirstDayOfMonth(year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const dateRows = getCalendarGrid(position, daysInMonth)

  const getStateClasses = (date: number) => {
    return date === day
      ? 'dark:bg-blue-500 dark:hover:bg-blue-500'
      : 'dark:bg-gray-800 dark:hover:bg-blue-700 cursor-pointer'
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(7,48px)] gap-1">
        {DAYS_OF_WEEK_SHORT.map(day => (
          <h3 key={day} className="flex justify-center py-2 text-sm font-normal">
            {day}
          </h3>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(7,48px)] gap-1">
        {dateRows.map((cellDay, index) => (
          <span
            className="flex h-[48px]"
            key={`${year}-${month}-${cellDay}-${index}`}
            data-active={day === cellDay ? 'true' : 'false'}
          >
            {cellDay && (
              <button
                className={`flex flex-auto items-center justify-center ${getStateClasses(cellDay)}`}
                onClick={() => handleDateClick?.(cellDay)}
              >
                {cellDay}
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

function MetaData({ year, month, day }: Omit<CalendarProps, 'handleDateClick'>) {
  const dayOfWeek = getDayOfWeek(year, month, day)
  const dayOfTheWeekPos = getDayOfWeekPosition(year, month, day)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  return (
    <p className="grid grid-cols-[minmax(120px,_1fr)_2fr] gap-2 border-2 border-dashed dark:border-gray-700 p-3 text-sm">
      <span>Day</span>
      <span>{day}</span>

      <span>Month</span>
      <span>{getMonthName(month)}</span>

      <span>Year</span>
      <span>{year}</span>

      <span>Days in month</span>
      <span>{daysInMonth}</span>

      <span>Day of the week</span>
      <span>
        {dayOfWeek} ({dayOfTheWeekPos})
      </span>

      <span>First day of month</span>
      <span>{firstDayOfMonth}</span>
    </p>
  )
}

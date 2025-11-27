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

type DatePickerProps = {
  today?: Date
}

export function DatePicker({ today = new Date() }: DatePickerProps) {
  // View state
  const [day, setDay] = useState(today.getDate())
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  // Selected state
  const [selectedDate, setSelectedDate] = useState(today)

  const dayOfWeek = getDayOfWeek(year, month, day)

  const handleChangeMonth = (value: string) => {
    if (parseInt(value) <= MONTHS_IN_YEAR.length - 1) {
      setMonth(parseInt(value))
    }
  }

  const handleChangeYear = (value: string) => {
    setYear(parseInt(value))
  }

  /*
  We will use this if we connect a date input
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
  */

  const handleDateClick = (dayOfMonth: number) => {
    setDay(dayOfMonth)
    setSelectedDate(new Date(year, month, dayOfMonth))
  }

  const handlePrevMonthClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    const prevMonth = month - 1
    if (prevMonth < 0) {
      // Last month of previous year
      setMonth(MONTHS_IN_YEAR.length - 1)
      setYear(year - 1)
    } else {
      setMonth(prevMonth)
    }
  }

  const handleNextMonthClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    const nextMonth = month + 1
    if (nextMonth > MONTHS_IN_YEAR.length - 1) {
      // First month of next year
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(nextMonth)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <article className="border-3 border-gray-400 dark:border-gray-600 rounded-md p-4 mr-auto">
        <header className="dark:border-gray-600 pb-2 mb-1">
          <p className="text-xs uppercase mb-1">{dayOfWeek}</p>
          <p className="text-xl font-bold">
            {getMonthName(month)} {day}, {year}
          </p>

          <nav className="flex justify-between">
            <button
              className="size-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm cursor-pointer"
              onClick={handlePrevMonthClick}
            >
              &larr;
            </button>
            <button
              className="size-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm cursor-pointer"
              onClick={handleNextMonthClick}
            >
              &rarr;
            </button>
          </nav>
        </header>

        <Calendar
          year={year}
          month={month}
          day={day}
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
        />

        <DateFields
          year={year}
          month={month}
          handleChangeMonth={handleChangeMonth}
          handleChangeYear={handleChangeYear}
        />
      </article>
    </div>
  )
}

type GridItem = number | null

const getCalendarGrid = (offset = 0, daysInMonth: number): GridItem[] => {
  // Prevent entire row of empty cells
  if (offset >= 6) offset -= 6

  const size = offset + daysInMonth
  if (!size) return []

  const items = new Array(offset + daysInMonth).fill(null)

  for (let i = 1; i <= daysInMonth; i++) {
    items[i + offset] = i
  }

  return items
}

type CalendarProps = {
  year: number
  month: number
  day: number
  selectedDate: Date
  handleDateClick: (date: number) => void
}

type DateFieldsProps = Pick<CalendarProps, 'year' | 'month'> & {
  handleChangeMonth: (month: string) => void
  handleChangeYear: (year: string) => void
}

function DateFields({
  year,
  month,
  handleChangeYear,
  handleChangeMonth,
}: DateFieldsProps) {
  return (
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
          onChange={ev => handleChangeYear(ev.target.value)}
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
    </div>
  )
}

function Calendar({
  year,
  month,
  day,
  selectedDate,
  handleDateClick,
}: CalendarProps) {
  const position = getFirstDayOfMonth(year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const dateRows = getCalendarGrid(position, daysInMonth)

  const isSelectedDate = (cellDay: number) => {
    return (
      new Date(year, month, cellDay).toDateString() ===
      selectedDate?.toDateString()
    )
  }

  const getStateClasses = (cellDay: number) => {
    return isSelectedDate(cellDay)
      ? 'bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-500'
      : 'dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-blue-700 cursor-pointer'
  }

  return (
    <div className="mx-auto">
      <header className="grid grid-cols-[repeat(7,48px)] gap-1 border-t-1 border-b-1 border-dashed border-gray-400 dark:border-gray-600 py-1 mb-2">
        {DAYS_OF_WEEK_SHORT.map(day => (
          <h3 key={day} className="flex justify-center text-sm font-normal">
            {day[0]}
          </h3>
        ))}
      </header>
      <div className="grid grid-cols-[repeat(7,48px)] gap-1">
        {dateRows.map((cellDay, index) => (
          <span
            className="flex h-[48px]"
            key={`${year}-${month}-${cellDay}-${index}`}
            data-active={day === cellDay ? 'true' : 'false'}
          >
            {cellDay && (
              <button
                className={`flex flex-auto items-center justify-center rounded-sm ${getStateClasses(cellDay)}`}
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

function getDayOfWeekPosition(
  year: number,
  month: number,
  day: number
): number {
  return new Date(year, month, day).getDay()
}

function getDayOfWeek(year: number, month: number, day: number): string {
  return DAYS_OF_WEEK_FULL[getDayOfWeekPosition(year, month, day)]
}

function getDaysInMonth(year: number, month: number): number {
  // Get day "zero" of the next month
  return new Date(year, month + 1, 0).getDate()
}

function getMonthName(monthPos: number): string {
  return MONTHS_IN_YEAR[monthPos]
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDay()
}

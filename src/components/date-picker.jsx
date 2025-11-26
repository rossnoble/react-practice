import { useState } from 'react'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
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

const today = new Date()

function getDayOfWeekPosition(year, month, day) {
  return new Date(year, month, day).getDay()
}

function getDayOfWeek(year, month, day) {
  return DAYS_OF_WEEK[getDayOfWeekPosition(year, month, day)]
}

function getDaysInMonth(year, month) {
  // Get the "zero-th" date of the next month
  return new Date(year, month + 1, 0).getDate()
}

function getMonthName(monthPos) {
  return MONTHS_IN_YEAR[monthPos]
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 0).getDay()
}

export function DatePicker() {
  const [day, setDay] = useState(today.getDate()) // [0-31]
  const [month, setMonth] = useState(today.getMonth()) // [0-11]
  const [year, setYear] = useState(today.getFullYear()) // e.g. 2024

  const dayOfWeek = getDayOfWeek(year, month, day)
  const dayOfTheWeekPos = getDayOfWeekPosition(year, month, day)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const handleChangeMonth = value => {
    if (parseInt(value) <= MONTHS_IN_YEAR.length - 1) {
      setMonth(value)
    }
  }

  const handleChangeDay = value => {
    const valueInt = parseInt(value)

    if (valueInt > daysInMonth) {
      setDay(1)
      setMonth(month + 1)
    } else if (valueInt < 1) {
      // FIXME: It should be the number of days in the previous month
      setDay(getDaysInMonth(year, month - 1))
      setMonth(month - 1)
    } else {
      setDay(valueInt)
    }
  }

  const handleDateClick = date => setDay(date)

  return (
    <div className="flex flex-col gap-6">
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
            onChange={ev => setYear(ev.target.value)}
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

      <div className="grid grid-cols-[minmax(120px,_1fr)_2fr] gap-2">
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
      </div>

      <Calendar year={year} month={month} day={day} handleDateClick={handleDateClick} />
    </div>
  )
}

const getCalendarGrid = (offset = 0, daysInMonth) => {
  const items = new Array(offset + daysInMonth).fill(null)

  for (let i = 1; i <= daysInMonth; i++) {
    items[i + offset] = i
  }

  return items
}

function Calendar({ year, month, day, handleDateClick }) {
  const position = getFirstDayOfMonth(year, month, day)
  const daysInMonth = getDaysInMonth(year, month)
  const dateRows = getCalendarGrid(position, daysInMonth)

  const getStateClasses = date => {
    return date === day
      ? 'dark:bg-blue-500 dark:hover:bg-blue-500'
      : 'dark:bg-gray-700 dark:hover:bg-blue-600 cursor-pointer'
  }

  return (
    <div>
      <div className="grid grid-cols-7 font-bold">
        {DAYS_OF_WEEK.map(day => (
          <span key={day} className="flex justify-center py-1">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dateRows.map((cellDay, index) => (
          <span
            className="flex justify-center"
            key={`${year}-${month}-${cellDay}-${index}`}
            data-active={day === cellDay ? 'true' : 'false'}
          >
            {cellDay && (
              <button
                className={`py-3 flex flex-auto justify-center ${getStateClasses(cellDay)}`}
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

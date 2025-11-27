import { useState } from 'react'

import { MONTHS_IN_YEAR } from './constants'
import { getDayOfWeek, getMonthName } from './utils'
import { Calendar } from './calendar'
import { DateFields } from './date-fields'

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
    <>
      <p className="mb-4">
        The date selected is{' '}
        <strong>
          {dayOfWeek}, {getMonthName(month)} {day}, {year}
        </strong>
        .
      </p>

      <DateFields
        year={year}
        month={month}
        handleChangeMonth={handleChangeMonth}
        handleChangeYear={handleChangeYear}
        className="mb-8"
      />

      <article className="bg-white border-1 border-gray-300 dark:border-gray-600 rounded-md p-4 mr-auto inline-block _shadow-md">
        <header className="dark:border-gray-600 pb-2 mb-1 text-center">
          <nav className="flex justify-between items-center">
            <button
              className="size-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm cursor-pointer"
              onClick={handlePrevMonthClick}
            >
              &larr;
            </button>
            <h3 className="text-lg font-semibold">
              {getMonthName(month)} {year}
            </h3>
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
      </article>
    </>
  )
}

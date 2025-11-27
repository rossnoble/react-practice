import { DAYS_OF_WEEK_SHORT } from './constants'
import { getDaysInMonth, getFirstDayOfMonth } from './utils'

export type CalendarProps = {
  year: number
  month: number
  day: number
  selectedDate: Date
  handleDateClick: (date: number) => void
}

export function Calendar({
  year,
  month,
  day,
  selectedDate,
  handleDateClick,
}: CalendarProps) {
  const position = getFirstDayOfMonth(year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const dateRows = buildCalendarGrid(position, daysInMonth)

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

type GridItem = number | null

function buildCalendarGrid(offset = 0, daysInMonth: number): GridItem[] {
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

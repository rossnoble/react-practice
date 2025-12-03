import { DAYS_OF_WEEK_FULL, MONTHS_IN_YEAR } from './constants'

export function getDayOfWeekPosition(
  year: number,
  month: number,
  day: number
): number {
  return new Date(year, month, day).getDay()
}

export function getDayOfWeek(year: number, month: number, day: number): string {
  return DAYS_OF_WEEK_FULL[getDayOfWeekPosition(year, month, day)]
}

export function getDaysInMonth(year: number, month: number): number {
  // Get day "zero" of the next month
  return new Date(year, month + 1, 0).getDate()
}

export function getMonthName(monthPos: number): string {
  return MONTHS_IN_YEAR[monthPos]
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDay()
}

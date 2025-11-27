import { CalendarProps } from './calendar'

export type DateFieldsProps = React.ComponentProps<'div'> &
  Pick<CalendarProps, 'year' | 'month'> & {
    handleChangeMonth: (month: string) => void
    handleChangeYear: (year: string) => void
  }

export function DateFields({
  year,
  month,
  handleChangeYear,
  handleChangeMonth,
  ...rest
}: DateFieldsProps) {
  return (
    <div {...rest}>
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
            className="bg-white border-1 border-gray-300 py-1 px-2 w-[80px]"
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
            className="bg-white border-1 border-gray-300 py-1 px-2 w-[80px]"
          />
        </div>
      </div>
    </div>
  )
}

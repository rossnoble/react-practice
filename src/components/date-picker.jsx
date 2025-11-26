export function DatePicker() {
  const dateOfWeek = getDayOfWeek()
  return <p>Date of week: {dateOfWeek}</p>
}

const getDateOfWeekInt = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  return dayOfWeek
}

function getDayOfWeek() {
  return DAYS_OF_WEEK[getDateOfWeekInt()]
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']

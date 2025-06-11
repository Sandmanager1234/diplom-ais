import dayjs from 'dayjs'

export const getMonthsOfPeriod = (start: any, end: any) => {
  const date = end ? dayjs(end) : dayjs()
  return date.diff(dayjs(start), 'month')
}

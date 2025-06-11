import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getAge = (age: number) => {
  return `${dayjs().from(dayjs().subtract(age, 'year').format('YYYY'), true)}`
}

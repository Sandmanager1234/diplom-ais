import dayjs, { Dayjs } from 'dayjs'

import { IMeeting } from 'services/models'

const filterEventsByDays = (events: IMeeting[], day: Dayjs) =>
  events.filter((event) => {
    return (
      dayjs(event.endDate).format('X') >= day.startOf('day').format('X') &&
      dayjs(event.endDate).format('X') <= day.endOf('day').format('X')
    )
  })

export const getListOfDaysWithEvenhts = (
  content: IMeeting[],
  startDay: Dayjs,
  endDay: Dayjs
) => {
  const countOfTimeEntity = endDay.diff(startDay, 'day') + 1

  const daysArray = new Array(countOfTimeEntity)
    .fill(startDay)
    .map((d, index) => ({
      day: d.add(index, 'day'),
      events: [...filterEventsByDays(content, d.add(index, 'day'))],
    }))

  return daysArray
}

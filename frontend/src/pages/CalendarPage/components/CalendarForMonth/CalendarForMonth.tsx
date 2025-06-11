import {useEffect } from 'react'
import { Dayjs } from 'dayjs'

import { fetchMeetings } from 'store/slices/meetingSlice'

import { useAppDispatch, useAppSelector } from 'store'

import { NAME_WEEK_DAYS } from './data/constants'

import { getListOfDaysWithEvenhts } from './services/getListOfDaysWithEvenhts'

import { DayOfMonth, ShowDayEvent } from './components'

import style from './CalendarForMonth.module.css'

interface IProps {
  pointReference: Dayjs
  selectedDay: Dayjs
  addTargetDay: (day: Dayjs) => void
  onOpen: (targetDay?: Dayjs) => void
}

const CalendarForMonth = ({
                            pointReference,
                            addTargetDay,
                            selectedDay,
                            onOpen,
                          }: IProps) => {
  const { content } = useAppSelector((state) => state.meetings)

  const dispatch = useAppDispatch()

  const startDay = pointReference.startOf('month').startOf('week')

  const endDay = pointReference.endOf('month').endOf('week')

  const monthArr = getListOfDaysWithEvenhts(content, startDay, endDay)

  const updateMeetings = () => {
    dispatch(
      fetchMeetings({
        params: `&from=${startDay
          .subtract(13, 'hours')
          .add(1, 'day')
          .toISOString()}&to=${endDay.subtract(2, 'hours').toISOString()}`,
      }),
    )

  }

  useEffect(() => {
    updateMeetings()
  }, [pointReference, content.length])

  return (
    <div className={style.wrap}>
      <div className={style.calendar}>
        {NAME_WEEK_DAYS.map((item) => (
          <div className={style.nameOfDaysOfWeek} key={item}>
            {item}
          </div>
        ))}
        {monthArr.map((item) => (
          <DayOfMonth
            selectedDay={selectedDay}
            addTargetDay={addTargetDay}
            key={item.day.format('X')}
            dayOfMonth={item.day}
            pointReference={pointReference}
            events={item.events}
            updateMeetings={updateMeetings}
            onOpen={onOpen}
          />
        ))}
      </div>
      <ShowDayEvent day={selectedDay} onOpen={onOpen} updateMonth={updateMeetings}/>
    </div>
  )
}

export default CalendarForMonth

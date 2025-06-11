import { FC, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { useAppDispatch, useAppSelector } from 'store'

import { fetchMeetings } from 'store/slices/meetingSlice'
import { IMeeting } from 'services/models'
import { getTopPosition } from '../../services/getTopPosition'
import { TOP_OFFSET } from '../../data/constants'
import { getHeight } from '../Day/services/getHeight'
import { Event } from '../Event'

import styles from './Week.module.css'

interface IProps {
  pointReference: Dayjs
  weekDays: Array<any>
}

const Week = ({ pointReference, weekDays}: IProps) => {

  const { content } = useAppSelector((state) => state.meetings)

  const dispatch = useAppDispatch()

  const startDay = pointReference.startOf('week').startOf('day')

  const endDay = pointReference.endOf('week').endOf('day')

  const updateMeetings = () =>{
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
    updateMeetings();
  }, [pointReference, content.length])

  const eventInlineStyles = (event: IMeeting, day: Dayjs) => ({
    top: `${getTopPosition(dayjs(event.startDate), day) + TOP_OFFSET}%`,
    height: `${getHeight(dayjs(event.startDate), dayjs(event.endDate))}%`,
  })

  const startDayTime = pointReference.hour(8)
  const endDayTime = pointReference.clone().hour(18)

  const countOfTimeEntity = endDayTime.diff(startDayTime, 'hours') + 1
  const hoursArr = new Array(countOfTimeEntity).fill(startDayTime)

  return (
    <>
      {weekDays.map((day, index) => (
        <div key={index} className={styles.dayWrapper}>
          {content.map((item) => (
            <Event
              key={item.id}
              event={item}
              className={styles.event}
              inlineStyle={eventInlineStyles(item, day)}
              updateMeetings={updateMeetings}
            />
          ))}
          <div className={styles.dayName}>
            <span>
              {day.format('D MMMM')}
              {day.isToday() && <span className={styles.isToday} />}
            </span>
            <span>{day.format('dddd')}</span>
          </div>
          {hoursArr.map((_, index) => (
            <div className={styles.dayCell} key={index} />
          ))}
        </div>
      ))}
    </>
  )
}

export default Week

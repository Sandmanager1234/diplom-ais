import { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from 'store'
import { fetchMeetings } from 'store/slices/meetingSlice'

import { IMeeting } from 'services/models'

import { getTopPosition } from '../../services/getTopPosition'
import { TOP_OFFSET } from '../../data/constants'

import { Event } from '..'

import { getHeight } from './services/getHeight'

import style from './Day.module.css'

export interface IDayProps {
  day: Dayjs
  singleDay?: boolean
}

dayjs.extend(isToday)

const Day = ({ day, singleDay}: IDayProps) => {
  const { content } = useAppSelector((state) => state.meetings)

  const dispatch = useAppDispatch()

  const updateMeetings = () => {
    dispatch(
      fetchMeetings({
        params: `&from=${day
          .startOf('day')
          .add(11, 'hours')
          .toISOString()}&to=${day
          .endOf('day')
          .subtract(2, 'hours')
          .toISOString()}`,
      }),
    )
  }

  useEffect(() => {
    updateMeetings()
  }, [day, content.length])

  const startDay = day.hour(8)
  const endDay = day.clone().hour(18)

  const countOfTimeEntity = endDay.diff(startDay, 'hours') + 1
  const hoursArr = new Array(countOfTimeEntity).fill(startDay)

  const dayNameStyle = cn({
    [style.dayName]: !singleDay,
    [style.singleDayName]: singleDay,
  })

  const singleDayNameFormat =
    day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1)

  const eventInlineStyles = (event: IMeeting) => ({
    top: `${getTopPosition(dayjs(event.startDate), day) + TOP_OFFSET}%`,
    height: `${getHeight(dayjs(event.startDate), dayjs(event.endDate))}%`,
  })

  return (
    <div className={style.dayWrapper}>
      {content.map((item) => (
        <Event
          key={item.id}
          event={item}
          className={style.event}
          inlineStyle={eventInlineStyles(item)}
          updateMeetings={updateMeetings}
        />
      ))}
      <div className={dayNameStyle}>
        <span>
          {day.format('D MMMM')}
          {day.isToday() && !singleDay && <span className={style.isToday} />}
        </span>
        <span>{singleDay ? singleDayNameFormat : day.format('dddd')}</span>
      </div>
      {hoursArr.map((_, index) => (
        <div className={style.dayCell} key={index} />
      ))}
    </div>
  )
}

export default Day

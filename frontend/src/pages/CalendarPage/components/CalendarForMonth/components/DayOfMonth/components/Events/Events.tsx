import { Dayjs } from 'dayjs'

import { IMeeting } from 'services/models'

import { Event } from '../../../../..'

import style from './Events.module.css'

interface IProps {
  events: IMeeting[]
  pointReference: Dayjs
  dayOfMonth: Dayjs
  updateMeetings: () => void
}

const Events = ({ events,dayOfMonth, pointReference, updateMeetings }: IProps) => {

  if(!pointReference.isSame(dayOfMonth , 'month')) return null

  return (
    <>
      {events.slice(0, 2).map((i) => (
        <Event className={style.events} event={i} updateMeetings={updateMeetings}/>
      ))}
      {events.length > 2 && (
        <div className={style.otherEventsLength}>ещё {events.length - 2}</div>
      )}
    </>
  )
}

export default Events

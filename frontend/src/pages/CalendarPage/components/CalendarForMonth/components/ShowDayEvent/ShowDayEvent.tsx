import { forwardRef, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Dayjs } from 'dayjs'

import { IMeeting } from 'services/models'

import { Event } from '../../../'

import { Loader, NoEvents } from './components'

import style from './ShowDayEvent.module.css'
import { useAppSelector } from '../../../../../../store'
import { meetingApi } from '../../../../../../services/meetingApi/meetingApi'

interface IProps {
  day: Dayjs
  onOpen: (targetDay?: Dayjs) => void
  updateMonth: () => void
}

const ShowDayEvent = forwardRef<HTMLDivElement, IProps>(({ day, onOpen, updateMonth }, ref) => {
  const [events, setEvents] = useState<IMeeting[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const {redactingMeeting} = useAppSelector((state) => state.calendar)

  const updateMeetings = () => {
    setIsLoading(true)
    if (day) {
      meetingApi
        .getMeeting(
          `&from=${day
            .subtract(13, 'hours')
            .add(1, 'day')
            .toISOString()}&to=${day
            .subtract(2, 'hours')
            .add(1, 'day')
            .toISOString()}`,
        )
        .then(
          setEvents,
        )
        .finally(() => {
          setIsLoading(false)
          updateMonth()
        })
    }

  }

  const dayFormat = day?.format('dddd, D MMMM')

  const daytoUpperCase =
    dayFormat && dayFormat.charAt(0).toUpperCase() + dayFormat.slice(1)

  const eventListStyle = cn({
    [style.noEventList]: isLoading || !events.length,
    [style.eventList]: !isLoading,
  })

  const showDayEventContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateMeetings()
  }, [day, events.length, redactingMeeting])

  const conditionalRendering = () => {
    if (isLoading) return <Loader />

    if (!!events.length) return events.map((item) => (
      <Event isMonth key={item.id} event={item} className={style.event} updateMeetings={updateMeetings} />
    ))
    else {
      return <NoEvents onOpen={onOpen} day={day} />
    }
  }

  if (!day) return null

  return (
    <div ref={showDayEventContainer}>
      <div ref={ref} className={style.showDayEvent}>
        <header className={style.header}>{daytoUpperCase}</header>
        <div className={eventListStyle}>{conditionalRendering()}</div>
      </div>
    </div>
  )
})

export default ShowDayEvent

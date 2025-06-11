import dayjs, { Dayjs } from 'dayjs'
import cn from 'classnames'

import { IMeeting } from 'services/models'

import { Events } from './components'

import style from './DayOfMonth.module.css'

interface IProps {
  pointReference: Dayjs
  dayOfMonth: Dayjs
  events: IMeeting[]
  addTargetDay: (day: Dayjs) => void
  selectedDay: Dayjs | null
  updateMeetings: () => void
  onOpen: (targetDay?: Dayjs) => void
}

const DayOfMonth = ({
                      pointReference,
                      dayOfMonth,
                      events,
                      addTargetDay,
                      selectedDay,
                      updateMeetings,
                      onOpen
                    }: IProps) => {
  const dayNumberStyle = (day: Dayjs) =>
    cn(style.dayNumber, {
      [style.dayNumberInCurrentMonth]: pointReference.isSame(day, 'month'),
      [style.currentDay]: dayjs().isSame(day, 'day'),
    })

  const dayMonthStyle = (day: Dayjs) =>
    cn({
      [style.day]: pointReference.isSame(day, 'month'),
      [style.dayInOtherMonth]: !pointReference.isSame(day, 'month'),
      [style.activeDay]: selectedDay?.isSame(dayOfMonth),
    })

  const onAddTargetDay = () => addTargetDay(dayOfMonth)

  return (
    <div onClick={onAddTargetDay} onDoubleClick={() => onOpen(selectedDay!)} className={dayMonthStyle(dayOfMonth)}>
      <span className={dayNumberStyle(dayOfMonth)}>
        <span>{dayOfMonth.format('D')}</span>
      </span>
      <Events
        dayOfMonth={dayOfMonth}
        pointReference={pointReference}
        events={events}
        updateMeetings={updateMeetings}
      />
    </div>
  )
}

export default DayOfMonth

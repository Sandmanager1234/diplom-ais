import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import updateLocale from 'dayjs/plugin/updateLocale'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { Icon, Modal } from 'UI'

import { useAppDispatch, useAppSelector } from 'store'

import { clearPatricipants } from 'store/slices/meetingSlice'
import { CURRENT_ACTION } from 'UI/Modal/data/models'
import { CreateEventModal } from 'UI/Modal/Components/CreateEventModal'

import { VariantsOfCalendar } from './data/models'
import { MONTHS, MONTHS_IN_GENITIVE_CASE, MONTHS_SHORT } from './data/constants'
import {
  CalendarForMonth,
  Day,
  MiniCalendar,
  SwitchingActions,
  TimeContainer, Week,
} from './components'

import style from './CalendarPage.module.css'
import { changeRedactingMeeting } from '../../store/reducers/calendarReducer'

dayjs.locale('ru')
dayjs.extend(advancedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('ru', {
  months: (dayjsInstance: Dayjs, format: string) => {
    if (/^MMMM YYYY/.test(format)) {
      return MONTHS[dayjsInstance.month()]
    } else {
      return MONTHS_IN_GENITIVE_CASE[dayjsInstance.month()]
    }
  },
  monthsShort: MONTHS_SHORT,
})

const CalendarPage = () => {
  const { content } = useAppSelector((state) => state.meetings)
  const { redactingMeeting } = useAppSelector(state => state.calendar)

  const [pointReference, setPointReference] = useState<Dayjs>(dayjs())

  const [isOpen, setIsOpen] = useState(false)

  const [variantCalendar, setVariantCalendar] = useState<VariantsOfCalendar>(
    VariantsOfCalendar.MONTH,
  )

  const [day, setDay] = useState<Dayjs>(dayjs().startOf('day'))

  const [exitConfirmation, setExitConfirmation] = useState(false)

  const calendarWrapperRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()


  const switchCalendar = (next: boolean) => () => {
    setPointReference((prev) =>
      next ? prev.add(1, variantCalendar) : prev.subtract(1, variantCalendar),
    )
    setDay(pointReference)
  }

  const switchCalendarVariant = (unitOfTime: VariantsOfCalendar) => {
    setVariantCalendar(unitOfTime)
    setPointReference(dayjs())
    setDay(pointReference)
  }

  const startDay = pointReference.startOf('week')

  const endDay = pointReference.endOf('week')

  const countOfTimeEntity = endDay.diff(startDay, 'day') + 1

  const weekDays = new Array(countOfTimeEntity)
    .fill(startDay)
    .map((d, index) => d.add(index, 'day'))

  const renderCalendar = () => {
    switch (variantCalendar) {
      case VariantsOfCalendar.MONTH:
        return (
          <CalendarForMonth
            selectedDay={day}
            addTargetDay={setDay}
            pointReference={pointReference}
            onOpen={onOpen}
          />
        )
      case VariantsOfCalendar.WEEK:
        return (
          <Week pointReference={pointReference} weekDays={weekDays} />
        )
      default:
        return <Day day={pointReference} singleDay />
    }
  }

  const getViewsCalendar = (): any => {
    switch (variantCalendar) {
      case VariantsOfCalendar.MONTH:
        return ['month', 'year']
      case VariantsOfCalendar.WEEK:
        return ['month', 'day']
      default:
        return ['month', 'day']
    }
  }

  const getFormat = (): string => {
    switch (variantCalendar) {
      case VariantsOfCalendar.MONTH:
        return `${pointReference.format('MMMM YYYY')}`
      case VariantsOfCalendar.WEEK:
        return `${startDay.format('D MMMM')} - ${endDay.format('D MMMM YYYY')}`
      default:
        return `${pointReference.format('D MMMM YYYY')}`
    }
  }

  const onClose = () => {
    setIsOpen(false)
    dispatch(clearPatricipants())
    dispatch(changeRedactingMeeting(undefined))
  }

  const onOpen = (targetDay?: Dayjs) => {
    if(targetDay)
      setDay(targetDay)

    setIsOpen(true)
  }

  useEffect(() => {
    if (redactingMeeting)
      onOpen()
  }, [redactingMeeting])

  return (
    <div className={style.calendarPage}>
      <header className={style.header}>
        <div>
          <Link className={style.link} to={'/'}>
            Главная
            <Icon.ArrowChewronRight />
          </Link>
          <span>Календарь</span>
        </div>
        <button className={style.btn} onClick={() => onOpen()}>
          Создать
        </button>
      </header>
      <div className={style.contentFlexContainer}>
        <Modal
          actionType={CURRENT_ACTION.EXIT}
          exitConfirmation={exitConfirmation}
          open={isOpen}
          closeModal={onClose}
        >
          <CreateEventModal
            setExitConfirmation={setExitConfirmation}
            closeModal={onClose}
            redactingMeeting={redactingMeeting}
            startDate={day}
          />
        </Modal>
        <div className={style.content}>
          <div className={style.miniCalendarContainer}>
            <MiniCalendar
              setPointReference={setPointReference}
              pointReference={pointReference}
              variantCalendar={variantCalendar}
              getFormat={getFormat}
              getViewsCalendar={getViewsCalendar}
            />
            {!!content.length && (
              <span className={style.countEvents}>
                Количество событий: {content.length}
              </span>
            )}
          </div>
          <SwitchingActions
            variantCalendar={variantCalendar}
            switchCalendar={switchCalendar}
            switchCalendarVariant={switchCalendarVariant}
          />
          <div ref={calendarWrapperRef} className={style.calendarWrapper}>
            {variantCalendar !== VariantsOfCalendar.MONTH && (
              <TimeContainer pointReference={pointReference} />
            )}
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage

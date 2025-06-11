import {useEffect, useState, FC} from 'react'

import {Icon, Modal} from "UI";
import { useAppDispatch, useAppSelector } from 'store'

import { CreateEventModal } from 'UI/Modal/Components/CreateEventModal'
import { TdTime } from './components/TdTime'
import { TdEvents } from './components/TdEvents'
import {
  setCalendarDate,
  setContentMeeting,
} from '../../../../store/slices/meetingSlice'
import { getTimeInMilliseconds } from '../../../../utils/getTimeInMilliseconds'
import { meetingApi } from '../../../../services/meetingApi/meetingApi'


import styles from './Calendar.module.css'

export const Calendar: FC = () => {
  const [isCreateEvent, setCreateEvent] = useState(false)

  const open = () => setCreateEvent(true)

  const close = () => setCreateEvent(false)

  const { content, currentDateCalendar } = useAppSelector(
    (state) => state.meetings
  )

  const dispatch = useAppDispatch()

  const [nearMonday, setNearMonday] = useState<Date>(
    new Date(currentDateCalendar)
  )

  const timeMas = [
    { number: 1, hour: 8 },
    { number: 2, hour: 9 },
    { number: 3, hour: 10 },
    { number: 4, hour: 11 },
    { number: 5, hour: 12 },
    { number: 6, hour: 13 },
    { number: 7, hour: 14 },
    { number: 8, hour: 15 },
    { number: 9, hour: 16 },
    { number: 10, hour: 17 },
    { number: 11, hour: 18 },
    { number: 12, hour: 19 },
  ]

  function getYLine() {
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    const hour = timeMas.find((item) => item.hour === currentHour)?.number
    return hour ? hour * 56 + 4 + currentMinute * 0.933 : 0
  }

  useEffect(() => {
    const prevMonday = new Date(currentDateCalendar)
    if (prevMonday.getDay() !== 1) {
      prevMonday.setDate(
        prevMonday.getDate() + ((1 - 7 - prevMonday.getDay()) % 7 || 7)
      )
      meetingApi
        .getMeeting(
          `&from=${new Date(prevMonday)
            .toISOString()
            .slice(0, 11)}00:00:00.000Z&to=${new Date(
            new Date(prevMonday).getTime() + 1000 * 60 * 60 * 24 * 6
          )
            .toISOString()
            .slice(0, 11)}23:59:00.000Z`
        )
        .then((res) => dispatch(setContentMeeting(res)))
    } else {
      meetingApi
        .getMeeting(
          `&from=${new Date(prevMonday)
            .toISOString()
            .slice(0, 11)}00:00:00.000Z&to=${new Date(
            new Date(prevMonday).getTime() + 1000 * 60 * 60 * 24 * 6
          )
            .toISOString()
            .slice(0, 11)}23:59:00.000Z`
        )
        .then((res) => dispatch(setContentMeeting(res)))
    }
    setNearMonday(prevMonday)
  }, [currentDateCalendar])

  return (
    <div className={styles.wrap}>
      <div className={styles.navigate}>
        {/*<button onClick={()=> dispatch(getProfileMeeting())}>asdfasdfasdf</button>*/}
        <button
          className={styles.btnCreateEvent}
          onClick={open}
        >
          Создать
        </button>
        <div>
          <button
            className={styles.btnArrow}
            onClick={() => {
              dispatch(setContentMeeting([]))
              dispatch(
                setCalendarDate(
                  new Date(
                    new Date(currentDateCalendar).getFullYear(),
                    new Date(currentDateCalendar).getMonth(),
                    new Date(currentDateCalendar).getDate() - 7,
                    6
                  ).toString()
                )
              )
            }}
          >
            <Icon.ArrowRight />
          </button>
          <button
            className={styles.btnArrow}
            onClick={() => {
              dispatch(setContentMeeting([]))
              dispatch(
                setCalendarDate(
                  new Date(
                    new Date(currentDateCalendar).getFullYear(),
                    new Date(currentDateCalendar).getMonth(),
                    new Date(currentDateCalendar).getDate() + 7,
                    6
                  ).toString()
                )
              )
            }}
          >
            <Icon.ArrowRight />
          </button>
        </div>
      </div>
      <div className={styles.calendarWrap}>
        <div
          style={getYLine() ? { top: getYLine() } : { display: 'none' }}
          className={styles.dynamicLine}
        />
        <TdTime countMeeting={content.length} />
        <div className={styles.wrapColDay}>
          <TdEvents content={content} currentDate={nearMonday} />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(1))
            }
          />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(2))
            }
          />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(3))
            }
          />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(4))
            }
          />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(5))
            }
          />
        </div>
        <div className={styles.wrapColDay}>
          <TdEvents
            content={content}
            currentDate={
              new Date(nearMonday.getTime() + getTimeInMilliseconds(6))
            }
          />
        </div>
      </div>
      <Modal open={isCreateEvent} closeModal={close}>
        <CreateEventModal
          data={null}
          setActive={setCreateEvent}
          active={isCreateEvent}
        />
      </Modal>
    </div>
  )
}

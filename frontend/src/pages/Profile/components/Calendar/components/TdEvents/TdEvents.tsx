import React, { useEffect, useState } from 'react'
import styles from './TdEvents.module.css'
import { IMeeting } from '../../../../../../services/models'
import { CalendarEvent } from './components/CalendarEvent'
import { isArray } from 'lodash'

interface ITdEvents {
  currentDate: Date
  content: Array<IMeeting>
}

export const TdEvents: React.FC<ITdEvents> = (props) => {
  const { currentDate, content } = props

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: window.innerWidth < 1440 ? 'short' : 'long',
  }
  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: window.innerWidth <= 1440 ? 'short' : 'long',
  }

  const formatterDate = new Intl.DateTimeFormat('ru', dateOptions)
  const weekdayDate = new Intl.DateTimeFormat('ru', weekdayOptions)

  const [overlappingMeetings, setOverlappingMeetings] = useState([])

  const [currentMeetings, setCurrentMeetings] = useState<IMeeting[]>([])

  useEffect(() => {
    if (isArray(content)) {
      setCurrentMeetings(
        content.filter(
          (item) =>
            new Date(item.startDate).getDate() ===
              new Date(currentDate).getDate() ||
            new Date(item.endDate).getDate() ===
              new Date(currentDate).getDate() ||
            (new Date(currentDate).getDate() <
              new Date(item.endDate).getDate() &&
              new Date(currentDate).getDate() >
                new Date(item.startDate).getDate())
        )
      )
      const overMeeting: any = {}
      for (let i = 0; i < content.length; i++) {
        if (
          new Date(content[i].startDate).getDate() ===
            new Date(currentDate).getDate() ||
          new Date(content[i].endDate).getDate() ===
            new Date(currentDate).getDate() ||
          (new Date(currentDate).getDate() <
            new Date(content[i].endDate).getDate() &&
            new Date(currentDate).getDate() >
              new Date(content[i].startDate).getDate())
        ) {
          for (let j = 0; j < content.length; j++) {
            if (
              new Date(content[j].startDate).getDate() ===
                new Date(currentDate).getDate() ||
              new Date(content[j].endDate).getDate() ===
                new Date(currentDate).getDate() ||
              (new Date(currentDate).getDate() <
                new Date(content[j].endDate).getDate() &&
                new Date(currentDate).getDate() >
                  new Date(content[j].startDate).getDate())
            ) {
              if (
                (new Date(content[i].startDate).getHours() ==
                  new Date(content[j].startDate).getHours() ||
                  new Date(content[i].endDate).getHours() ==
                    new Date(content[j].endDate).getHours()) &&
                content[i].id != content[j].id
              ) {
                if (
                  Object.keys(overMeeting).pop() &&
                  overMeeting[Object.keys(overMeeting).pop()] != 'right'
                ) {
                  overMeeting[content[i].id] = 'right'
                } else {
                  overMeeting[content[i].id] = 'left'
                }
              }
            }
          }
        }
      }
      setOverlappingMeetings(overMeeting)
    }
  }, [currentDate, content])

  return (
    <div className={styles.wrap}>
      <div className={styles.countEvents}>
        {formatterDate.format(currentDate)} <br />
        <span>{weekdayDate.format(currentDate)}</span>
      </div>
      {currentMeetings.length
        ? currentMeetings.map((item) => (
            <CalendarEvent
              variant={overlappingMeetings[item.id]}
              key={item.id}
              currentDate={String(currentDate)}
              data={item}
            />
          ))
        : null}
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
    </div>
  )
}

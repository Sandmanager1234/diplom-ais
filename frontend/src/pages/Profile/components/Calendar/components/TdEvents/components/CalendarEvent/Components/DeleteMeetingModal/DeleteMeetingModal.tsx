import { Dispatch, FC } from 'react'

import { useAppDispatch, useAppSelector } from 'store'

import { setContentMeeting } from '../../../../../../../../../../store/slices/meetingSlice'
import { meetingApi } from '../../../../../../../../../../services/meetingApi/meetingApi'

import styles from './DeleteMeetingModal.module.css'

interface IDeleteMeetingModal {
  setActive: Dispatch<boolean>
  id: string
}

export const DeleteMeetingModal: FC<IDeleteMeetingModal> = (props) => {
  const { currentDateCalendar } = useAppSelector((state) => state.meetings)

  const dispatch = useAppDispatch()

  const deleteMeeting = () => {
    meetingApi.deleteMeeting(props.id).finally(() => {
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
          .finally(() => props.setActive(false))
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
          .finally(() => props.setActive(false))
      }
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Удалить событие?</div>
      <div className={styles.subTitle}>
        Вы уверены, что хотите удалить событие? Все данные будут утеряны.
      </div>
      <div className={styles.wrapBtn}>
        <button
          className={styles.btnCancel}
          onClick={() => props.setActive(false)}
        >
          Отмена
        </button>
        <button className={styles.btnDelete} onClick={() => deleteMeeting()}>
          Удалить
        </button>
      </div>
    </div>
  )
}

import { FC, Dispatch } from 'react'

import { useAppDispatch, useAppSelector } from 'store'

import { setCountOfUnreadNotification } from 'store/slices/meetingSlice'
import { resumesApi } from 'services/resumesApi/resumesApi'

import styles from './ApplicantNotificationDeleteModal.module.css'

interface ApplicantNotificationDeleteModalProps {
  setActive: Dispatch<boolean>
  id: string
}

export const ApplicantNotificationDeleteModal: FC<
  ApplicantNotificationDeleteModalProps
> = (props) => {
  const dispatch = useAppDispatch()

  const { countOfUnreadNotification } = useAppSelector(
    (state) => state.meetings
  )

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Удалить уведомление?</div>
      <div className={styles.subTitle}>
        Вы уверены, что хотите удалить уведомление? Все данные будут утеряны.
      </div>
      <div className={styles.wrapBtn}>
        <button
          className={styles.btnCancel}
          onClick={() => props.setActive(false)}
        >
          Отмена
        </button>
        <button
          className={styles.btnDelete}
          onClick={() => {
            resumesApi
              .deleteNotificationById(props.id)
              .then(() => {
                dispatch(
                  setCountOfUnreadNotification(countOfUnreadNotification - 1)
                )
              })
              .finally(() => props.setActive(false))
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

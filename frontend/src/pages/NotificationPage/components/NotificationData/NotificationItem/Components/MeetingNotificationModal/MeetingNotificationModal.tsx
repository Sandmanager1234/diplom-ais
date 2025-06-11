import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store'
import { Icon } from 'UI'

import { NotificationItemProps } from 'pages/NotificationPage/components/NotificationData/NotificationItem/index'

import { getInitials } from 'utils/getInitials'
import { setCountOfUnreadNotification } from 'store/slices/meetingSlice'
import { resumesApi } from 'services/resumesApi/resumesApi'

import styles from './MeetingNotificationModal.module.css'


interface IMeetingNotificationModalProps extends NotificationItemProps {
  isActive: boolean
}

export const MeetingNotificationModal: FC<IMeetingNotificationModalProps> = (
  props
) => {
  const {
    name,
    emailAuthor,
    comment,
    idApplicant,
    date,
    timeCreate,
    isActive,
    id,
    isViewed,
    applicantFio,
  } = props

  const { profileHR } = useAppSelector((state) => state.meetings)

  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
  }

  const [isRendered, setIsRendered] = useState<boolean>(false)

  const weekdayDate = new Intl.DateTimeFormat('ru', weekdayOptions)

  const { countOfUnreadNotification } = useAppSelector(
    (state) => state.meetings
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isActive && !isViewed && isRendered) {
      resumesApi.readNotificationById(id)
      dispatch(setCountOfUnreadNotification(countOfUnreadNotification - 1))
    } else if (!isRendered) {
      setIsRendered(true)
    }
  }, [isActive])

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{name}</div>
      <div className={styles.authorInfo}>
        <div>
          <div className={styles.avatar}>{getInitials(profileHR.fio)}</div>
          <div>
            <div className={styles.nameAuthor}>{profileHR.fio}</div>
            <div className={styles.emailAuthor}>{emailAuthor}</div>
          </div>
        </div>
        <div className={styles.date}>
          {`${weekdayDate.format(new Date(date))} ${new Date(
            date
          ).toLocaleDateString()}`}
        </div>
      </div>
      <div className={styles.comment}>{comment}</div>
      {idApplicant != null && idApplicant ? (
        <div className={styles.applicant}>
          Соискатель:{' '}
          <Link to={`/applicant/${idApplicant}`}>{applicantFio}</Link>
        </div>
      ) : null}
      <div className={styles.timeNotificationWrap}>
        <Icon.Calendar />
        <div className={styles.timeNotification}>
          <span>Дата создания уведомления</span>
          {new Date(timeCreate).toLocaleString().slice(0, 10)}
        </div>
      </div>
    </div>
  )
}

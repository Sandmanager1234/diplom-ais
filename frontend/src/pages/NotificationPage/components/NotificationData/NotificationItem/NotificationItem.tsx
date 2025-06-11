import {FC, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import {Modal} from "UI";
import { useAppDispatch, useAppSelector } from 'store'

import { getInitials } from '../../../../../utils/getInitials'
import { MeetingNotificationModal } from './Components/MeetingNotificationModal'
import {
  setContent,
  setPagination,
} from '../../../../../store/slices/notificationSlice'
import { resumesApi } from '../../../../../services/resumesApi/resumesApi'

import styles from './NotificationItem.module.css'

export enum variantNotification {
  outlined = 'outlined',
  paintedOver = 'paintedOver',
}

export interface NotificationItemProps {
  id: string
  idApplicant: string
  emailAuthor: string
  applicantFio: string
  name: string
  comment: string
  isSent: boolean
  isViewed: boolean
  date: string
  timeCreate: string
  timeUpdate: string
  notificationSystems: {
    id: string
    idNotification: string
    notificationSource: string
    timeCreate: string
    timeUpdate: string
  }[]
  variant: variantNotification
}

export const NotificationItem: FC<NotificationItemProps> = (props) => {
  const {
    idApplicant,
    name,
    emailAuthor,
    comment,
    date,
    variant,
    applicantFio,
  } = props

  const [isNotificationModal, setNotificationModal] = useState(false)

  const open = () => setNotificationModal(true)

  const close = () => setNotificationModal(false)

  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
  }

  const { pagination } = useAppSelector((state) => state.notifications)
  const dispatch = useAppDispatch()

  const { profileHR } = useAppSelector((state) => state.meetings)

  const weekdayDate = new Intl.DateTimeFormat('ru', weekdayOptions)

  useEffect(() => {
    if (!isNotificationModal) {
      resumesApi
        .getNotifications(`?page=${pagination.number}&size=${pagination.size}`)
        .then((res) => {
          dispatch(setContent(res.content))
          dispatch(
            setPagination({
              number: res.number,
              size: res.size,
              totalElements: res.totalElements,
              totalPages: res.totalPages,
            })
          )
        })
    }
  }, [isNotificationModal])

  return (
    <div
      className={
        variant === variantNotification.outlined
          ? styles.wrapOutlined
          : styles.wrapPaintedOver
      }
    >
      <div className={styles.contentWrap}>
        <div className={styles.avatar}>{getInitials(profileHR.fio)}</div>
        <div className={styles.infoWrap}>
          <button
            className={styles.title}
            onClick={open}
          >
            {name}
          </button>
          <div className={styles.description}>{comment}</div>
          {idApplicant != null && idApplicant ? (
            <div className={styles.applicant}>
              Соискатель:{' '}
              <Link to={`/applicant/${idApplicant}`}>{applicantFio}</Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.date}>
        {`${weekdayDate.format(new Date(date))} ${new Date(
          date
        ).toLocaleDateString()}`}
      </div>
      <Modal open={isNotificationModal} closeModal={close}>
        <MeetingNotificationModal {...props} isActive={isNotificationModal} />
      </Modal>
    </div>
  )
}

import React, { FC, useEffect, useState } from 'react'

import { Icon, LoaderDots, Pagination } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { NotificationItem, variantNotification } from './NotificationItem'
import {
  setContent,
  setPagination,
} from '../../../../store/slices/notificationSlice'
import { NotificationContent } from 'services/resumesApi/models'
import { setCountOfUnreadNotification } from '../../../../store/slices/meetingSlice'
import { resumesApi } from '../../../../services/resumesApi/resumesApi'

import styles from './NotificationData.module.css'

export const NotificationData: FC = () => {
  const { content, pagination } = useAppSelector((state) => state.notifications)

  const dispatch = useAppDispatch()

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
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
        setTimeout(() => setIsLoad(true), 500)
      })
  }, [pagination.number, pagination.size])

  const readAllNotification = () => {
    resumesApi.readAllNotificationByUser().finally(() => {
      dispatch(setCountOfUnreadNotification(0))
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
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.controlNav}>
        <button className={styles.controlBtn} onClick={readAllNotification}>
          <Icon.MailOpen />
          Прочитать всё
        </button>
      </div>
      {isLoad ? (
        <div className={styles.listNotification}>
          {content?.map((notification: NotificationContent) => (
            <NotificationItem
              key={notification.id}
              variant={
                notification.isViewed
                  ? variantNotification.outlined
                  : variantNotification.paintedOver
              }
              {...notification}
            />
          ))}
          {content?.length ? (
            <Pagination
              currentPage={pagination.number}
              size={pagination.size}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              type={'Notification'}
            />
          ) : (
            <div className={styles.titleNoneNotification}>
              Уведомлений нет
              <span>У вас пока нет созданных уведомлений</span>
            </div>
          )}
        </div>
      ) : (
        <LoaderDots />
      )}
    </div>
  )
}

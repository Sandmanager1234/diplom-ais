import { FC, useEffect, useState, Dispatch } from 'react'
import { useParams } from 'react-router-dom'

import { Modal } from 'UI'

import {
  ApplicantNotification,
} from './Components/ApplicantNotificationCreateModal'
import { ApplicantNotificationDeleteModal, ApplicantNotificationCreateModal } from './Components'
import { resumesApi } from 'services/resumesApi/resumesApi'

import styles from './ApplicantNotificationViewModal.module.css'

interface ApplicantNotificationViewModalProps {
  active: boolean
  setActive: Dispatch<boolean>
}

export const ApplicantNotificationViewModal: FC<
  ApplicantNotificationViewModalProps
> = (props) => {
  const { active, setActive } = props

  const { id } = useParams()

  const [isNotificationCreate, setNotificationCreate] = useState(false)
  const [isNotificationDelete, setNotificationDelete] = useState(false)
  const [currentNotificationDelete, setCurrentNotificationDelete] =
    useState<string>('')
  const [currentNotificationEdit, setCurrentNotificationEdit] =
    useState<ApplicantNotification | null>(null)
  const [notifications, setNotifications] = useState<ApplicantNotification[]>(
    []
  )

  const openNotificationCreate = () => setNotificationCreate(true)
  const openNotificationDelete = () => setNotificationDelete(true)

  const closeNotificationCreate = () => setNotificationCreate(false)
  const closeNotificationDelete = () => setNotificationDelete(false)

  useEffect(() => {
    resumesApi
      .getAllNotificationById(id, '&size=1000&page=0')
      .then((res) => setNotifications(res.content))
    setCurrentNotificationEdit(null)
  }, [isNotificationCreate, isNotificationDelete])

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Напоминания</div>
      <div className={styles.notificationWrap}>
        {notifications
          ? notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <span className={styles.authorName}>
                  {notification.emailAuthor}
                </span>
                <div className={styles.name}>{notification.name}</div>
                <div className={styles.name}>{notification.comment}</div>
                <div className={styles.time}>
                  {new Date(notification.date).toLocaleDateString()}
                </div>
                <div className={styles.btnWrap}>
                  <button
                    onClick={() => {
                      setCurrentNotificationEdit(notification)
                      openNotificationCreate()
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => {
                      setCurrentNotificationDelete(notification.id)
                      openNotificationDelete()
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
      <button className={styles.btnCreate} onClick={openNotificationCreate}>
        Создать уведомление
      </button>
      <Modal open={isNotificationDelete} closeModal={closeNotificationDelete}>
        <ApplicantNotificationDeleteModal
          id={currentNotificationDelete}
          setActive={setNotificationDelete}
        />
      </Modal>
      <Modal open={isNotificationCreate} closeModal={closeNotificationCreate}>
        <ApplicantNotificationCreateModal
          isActive={isNotificationCreate}
          setActive={setNotificationCreate}
          data={currentNotificationEdit}
        />
      </Modal>
    </div>
  )
}

import { FC, useEffect, useRef, useState, Dispatch, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from 'store'

import { IUser } from 'types/user'
import { userApi } from 'services/userApi/userApi'
import { getInitials } from 'utils/getInitials'
import { setCountOfUnreadNotification } from 'store/slices/meetingSlice'
import { resumesApi } from 'services/resumesApi/resumesApi'

import styles from './ApplicantNotificationCreateModal.module.css'

interface ApplicantNotificationCreateModalProps {
  isActive: boolean
  setActive: Dispatch<boolean>
  data?: ApplicantNotification
}

export interface ApplicantNotification {
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
}

const initialData = {
  name: '',
  comment: '',
  date: '',
  isViewed: false,
  isSent: false,
  notificationSystems: [],
}

export const ApplicantNotificationCreateModal: FC<
  ApplicantNotificationCreateModalProps
> = (props) => {
  const { isActive, data = initialData, setActive } = props

  const { id } = useParams()

  const dispatch = useAppDispatch()

  const [isFocusDate, setFocusDate] = useState(false)
  const [isFocusName, setFocusName] = useState(false)
  const [isFocusComment, setFocusComment] = useState(false)

  const [profileHR, setProfileHR] = useState<IUser>()

  const [dataNotification, setDataNotification] = useState(initialData)

  const [isCreate, setCreate] = useState(true)

  const formRef: any = useRef()

  const getChecked = (
    checkedValue: string,
    checkedArray: { notificationSource: string }[]
  ): boolean => {
    if (
      checkedArray.length > 0 &&
      (checkedArray.length === 2 ||
        checkedArray.at(0)?.notificationSource === checkedValue)
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    userApi.getUser().then((res) => setProfileHR(res))
    setFocusName(false)
    setFocusDate(false)
    setFocusComment(false)
    if (data != null) {
      setCreate(false)
      setDataNotification({ ...data, date: data.date })
    } else {
      setCreate(true)
      setDataNotification(initialData)
    }
  }, [isActive])

  const handleCreateNotification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isCreate) {
      resumesApi
        .postNotification({
          ...dataNotification,
          date: `${dataNotification.date}`,
          idApplicant: id,
        })
        .finally(() =>
          resumesApi
            .getCountOfUnreadNotification()
            .then((res) => dispatch(setCountOfUnreadNotification(res.length)))
        )
        .finally(() => setActive(false))
    } else {
      resumesApi
        .putNotification({
          ...dataNotification,
          date: `${dataNotification.date}`,
          idApplicant: id,
        })
        .finally(() =>
          resumesApi
            .getCountOfUnreadNotification()
            .then((res) => dispatch(setCountOfUnreadNotification(res.length)))
        )
        .finally(() => setActive(false))
    }
  }

  return (
    <form
      ref={formRef}
      className={styles.wrap}
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleCreateNotification(e)
      }
    >
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {profileHR?.fio ? getInitials(profileHR?.fio) : 'AK'}
        </div>
        <div>
          <span className={styles.name}>{profileHR?.fio}</span>
          <span className={styles.email}>{profileHR?.email}</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <input
        type='text'
        placeholder={'Название'}
        required={true}
        value={dataNotification.name}
        focused={String(isFocusName)}
        onBlur={() => setFocusName(true)}
        pattern={
          dataNotification.name?.trim().length > 0
            ? '[a-zA-Z0-9,\\.\\_]{1,100}'
            : ''
        }
        onChange={(e) =>
          setDataNotification({ ...dataNotification, name: e.target.value })
        }
        className={styles.inpName}
      />
      <div className={styles.error}>
        {dataNotification.name?.length > 0
          ? `Введено недопустимое значение поля 'Название уведомления'.`
          : `Поле обязательно для заполнения.`}
      </div>
      <div className={styles.subTitle}>Источник уведомления</div>
      <div className={styles.choiceItem}>
        <label
          className={styles.checkboxContainer}
          onClick={() => {
            if (getChecked('SYSTEM', dataNotification.notificationSystems)) {
              setDataNotification({
                ...dataNotification,
                notificationSystems:
                  dataNotification.notificationSystems.filter(
                    (notification) =>
                      notification.notificationSource != 'SYSTEM'
                  ),
              })
            } else {
              setDataNotification({
                ...dataNotification,
                notificationSystems: [
                  ...dataNotification.notificationSystems,
                  { notificationSource: 'SYSTEM' },
                ],
              })
            }
          }}
        >
          <input
            readOnly={true}
            className={styles.inputCheckbox}
            checked={getChecked('SYSTEM', dataNotification.notificationSystems)}
            onClick={(e) => e.stopPropagation()}
            type='checkbox'
            required={true}
          />
          <span className={styles.checkboxIndicator}></span>
          Система
        </label>
      </div>
      <div className={styles.choiceItem}>
        <label
          className={styles.checkboxContainer}
          onClick={() => {
            if (getChecked('EMAIL', dataNotification.notificationSystems)) {
              setDataNotification({
                ...dataNotification,
                notificationSystems:
                  dataNotification.notificationSystems.filter(
                    (notification) => notification.notificationSource != 'EMAIL'
                  ),
              })
            } else {
              setDataNotification({
                ...dataNotification,
                notificationSystems: [
                  ...dataNotification.notificationSystems,
                  { notificationSource: 'EMAIL' },
                ],
              })
            }
          }}
        >
          <input
            readOnly={true}
            className={styles.inputCheckbox}
            checked={getChecked('EMAIL', dataNotification.notificationSystems)}
            onClick={(e) => e.stopPropagation()}
            type='checkbox'
          />
          <span className={styles.checkboxIndicator}></span>
          Почта
        </label>
      </div>
      <textarea
        className={styles.textAreaComment}
        value={dataNotification.comment}
        onBlur={() => setFocusComment(true)}
        placeholder={'Комментарий'}
        required={true}
        onChange={(e) =>
          setDataNotification({ ...dataNotification, comment: e.target.value })
        }
      />
      {isFocusComment &&
      ((dataNotification.comment.length > 0 &&
        dataNotification.comment.trim().length === 0) ||
        dataNotification.comment.length === 0) ? (
        <div className={styles.error}>
          {dataNotification.comment.length > 0 &&
          dataNotification.comment.trim().length === 0
            ? 'Введено недопустимое значение поля "Комментарий"'
            : 'Поле "Комментарий" обязательно для заполнения.'}
        </div>
      ) : null}
      <div className={styles.wrapNotification}>
        Время уведомления
        {isActive ? (
          <input
            type='date'
            required={true}
            onBlur={() => setFocusDate(true)}
            onChange={(e) =>
              setDataNotification({ ...dataNotification, date: e.target.value })
            }
            defaultValue={dataNotification.date}
          />
        ) : null}
        {isFocusDate &&
        (new Date(dataNotification.date) <
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ) ||
          dataNotification.date === '') ? (
          <div className={styles.errorActive}>
            {new Date(dataNotification.date) < new Date()
              ? 'Введено значение даты, которая меньше текущей'
              : 'Дата уведомления обязательны для заполнения.'}
          </div>
        ) : null}
      </div>
      <button
        disabled={
          !formRef.current?.checkValidity() ||
          dataNotification.notificationSystems.length === 0 ||
          new Date(dataNotification.date) <
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            )
        }
        className={styles.btnSave}
        type={'submit'}
      >
        Сохранить
      </button>
    </form>
  )
}

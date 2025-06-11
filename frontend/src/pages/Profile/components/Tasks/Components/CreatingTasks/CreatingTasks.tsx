import { useEffect, useState, Dispatch, FC, ChangeEvent, useRef } from 'react'

import { DateRange, Icon } from 'UI'
import { useClickOutside } from 'hooks'
import { useAppDispatch, useAppSelector } from 'store'

import {ITask} from "../../../../../../services/taskApi/models";
import { setContent, setPagination } from '../../../../../../store/slices/taskSlice'
import { getInitials } from '../../../../../../utils/getInitials'
import {taskApi} from "../../../../../../services/taskApi/taskApi";

import styles from './CreatingTasks.module.css'

interface ICreatingTasks {
  data: ITask | null;
  setActive: Dispatch<boolean>;
  active: boolean;
}

const priority = [
  { order: 'LOW', title: 'Низкий' },
  { order: 'MIDDLE', title: 'Средний' },
  { order: 'HIGH', title: 'Высокий' },
]

const dictionaryPriority = {
  LOW: 'Низкий',
  MIDDLE: 'Средний',
  HIGH: 'Высокий',
}
export const CreatingTasks: FC<ICreatingTasks> = (props) => {

  const butonRef = useRef<HTMLButtonElement>(null)

  const [showListPriority, setShowListPriority] = useState(false)

  const onChangeVisibilityOfListPriority = () => setShowListPriority(prevState => !prevState)

  const hideListPriority = () => setShowListPriority(false)

  useClickOutside(butonRef, hideListPriority)

  const { profileHR, hrEmails } = useAppSelector(state => state.tasks)

  const initialState = {
    name: '',
    description: '',
    emailExecutor: '',
    priorityValue: 'LOW',
  }

  const [focusName, setFocusName] = useState(false)
  const [focusComment, setFocusComment] = useState(false)
  const [focusExecutor, setFocusExecutor] = useState(false)

  const [status, setStatus] = useState(props?.data?.priorityValue ? props?.data?.priorityValue : 'LOW')
  const [taskData, setTaskData] = useState<ITask>(props.data)
  const [time, setTime] = useState({ start: props.data?.timeCreate, end: props.data?.dateTask })

  const refInvite = useRef<HTMLDivElement>(null)

  const [isActiveInvite, setIsActiveInvite] = useState(false)

  const makeInviteInactive = () => setIsActiveInvite(false)

  useClickOutside(refInvite,  makeInviteInactive)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setTaskData({ ...taskData, dateTask: time.end?.replaceAll('T', ' ') })
  }, [time])

  useEffect(() => {
    setTaskData({ ...taskData, priorityValue: status })
  }, [status])

  useEffect(() => {
    if (props.data == null) {
      setStatus('LOW')
      setTaskData(initialState)
      setTime({ start: props.data?.timeCreate || '', end: props.data?.dateTask || '' })
    } else {
      setStatus(props.data.priorityValue)
      setTaskData(props.data)
      setTime({ start: props.data?.timeCreate || '', end: props.data?.dateTask || '' })
    }
    setFocusExecutor(false)
    setFocusComment(false)
    setFocusName(false)
  }, [props.active])

  return (
    <form className={styles.creatingTasks} onSubmit={(e) => {
      e.preventDefault()
      if (taskData.emailExecutor !== '') {
        taskApi.addTask(taskData).then(() =>
            taskApi.getTasks('').then(res => {
            const { content, totalPages, totalElements, size, number } = res
            dispatch(setContent(content))
            dispatch(setPagination({ totalPages, totalElements, size, number }))
          }).then(() => props.setActive(false)))
      } else {
        setFocusExecutor(true)
      }
    }}>
      <div className={styles.bio}>
        <div className={styles.templatePhoto}>{profileHR?.fio ? getInitials(profileHR?.fio) : 'МЖ'}</div>
        <div className={styles.column}>
          <div>{profileHR?.fio}</div>
          <div>{profileHR?.email}</div>
        </div>
      </div>
      <div className={styles.enteringName}>
        <input
          required={true}
          maxLength={500}
          value={taskData?.name || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskData({
            ...taskData,
            name: e.target.value,
          })}
          onBlur={() => setFocusName(true)}
          placeholder='Название'
          type='text'
        />
        {taskData?.name?.length === 0 && focusName ?
          <div className={styles.error}>Поле "Название" обязательно для заполнения.</div> : null}
        {taskData?.name?.trim().length === 0 && taskData?.name?.length !== 0 && focusName ?
          <div className={styles.error}>Введено недопустимое значение поля "Название".</div> : null}
      </div>
      <div className={styles.comment}>
        <textarea
          value={taskData?.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTaskData({
            ...taskData,
            description: e.target.value,
          })}
          required={true}
          onBlur={() => setFocusComment(true)}
          placeholder='Комментарий'
        />
        {taskData?.description?.length === 0 && focusComment ?
          <div className={styles.error}>Поле "Комментарий" обязательно для заполнения.</div> : null}
        {taskData?.description?.trim().length === 0 && taskData?.description?.length !== 0 && focusComment ?
          <div className={styles.error}>Введено недопустимое значение поля "Комментарий".</div> : null}
      </div>
      <div className={styles.implementer} ref={refInvite} onFocus={() => setIsActiveInvite(true)}>
        <input
          onBlur={() => setFocusExecutor(true)}
          value={taskData?.emailExecutor || ''}
          required={true}
          readOnly={true}
          placeholder='Исполнитель'
          type='email'
          maxLength={100}
        />
        {taskData?.emailExecutor?.length === 0 && focusExecutor ?
          <div className={styles.error}>Поле "Исполнитель" обязательно для заполнения.</div> : null}
        {
          isActiveInvite && hrEmails.length > 0 ?
            <div className={styles.dropValues}>
              {
                hrEmails.length ? hrEmails.map((item, index) => (
                  <button key={index} type={'button'} onClick={() => {
                    setTaskData({
                      ...taskData,
                      emailExecutor: item.email,
                    })
                    setIsActiveInvite(false)
                  }}>
                    {item.fio}
                    <span>{item.email}</span>
                  </button>
                )) : null
              }
            </div>
            : null
        }
      </div>
      <div className={styles.dateRange}>
        <DateRange state={time} setState={setTime} />
      </div>
      <div className={styles.priority}>
        Приоритет
        <button
          onClick={onChangeVisibilityOfListPriority}
          className={styles.choicePriority}
          ref={butonRef}
          type={'button'}
        >
          <div className={styles[status.toLowerCase()]}></div>
          {dictionaryPriority[status]}
          <div className={showListPriority ? styles.arrowDown : styles.arrowUp}><Icon.ArrowChewronRight /></div>
        </button>
        <div className={showListPriority ? styles.listPriority : styles.hidden}>
          {priority.map((item, index) => (
              <button
                type={'button'}
                onClick={() => setStatus(item.order)}
                className={styles.prioritySelection}
                key={index}
              >
                <div className={styles[item.order.toLowerCase()]}></div>
                {item.title}
              </button>
            ),
          )}
        </div>
        <button className={styles.btnSave} type={'submit'}>Сохранить</button>
      </div>
    </form>
  )
}
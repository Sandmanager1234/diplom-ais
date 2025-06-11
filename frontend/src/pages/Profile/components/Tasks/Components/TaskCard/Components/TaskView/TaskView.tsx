import { useState, Dispatch, FC } from 'react'
import classNames from 'classnames'

import {Icon, Modal} from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { DeleteTask } from '../DeleteTask'
import { CreatingTasks } from '../../../CreatingTasks'
import {
  setContent,
  setPagination,
} from 'store/slices/taskSlice'
import { getInitials } from 'utils/getInitials'
import { taskApi } from 'services/taskApi/taskApi'
import { ITask } from 'services/taskApi/models'

import styles from './TaskView.module.css'

interface ITaskView {
  setActive: Dispatch<boolean>
  data: ITask
}

export const TaskView: FC<ITaskView> = (props) => {
  const { setActive, data } = props

  const { pagination, content, activeFilterTask, sortTask } = useAppSelector(
    (state) => state.tasks
  )
  const dispatch = useAppDispatch()

  const [isDeleteTask, setDeleteTask] = useState(false)
  const [isTaskCreationWindow, setTaskCreationWindow] = useState(false)

  const openDeleteTask = () => setDeleteTask(true)
  const openTaskCreationWindow = () => setTaskCreationWindow(true)

  const closeDeleteTask = () => setDeleteTask(false)
  const closeTaskCreationWindow = () => setTaskCreationWindow(false)

  const prioritise = classNames({
    [styles[data.priorityValue.toLowerCase()]]: true,
  })

  return (
    <div className={styles.wrap}>
      <span className={styles.title}>{data.name}</span>
      <div className={styles.priorityWrap}>
        <span className={prioritise}></span>
        {data.priorityDescription}
      </div>
      <span className={styles.description}>{data.description}</span>
      <div className={styles.hrWrap}>
        <div className={styles.infoHr}>
          <span>Автор</span>
          <div className={styles.info}>
            <span className={styles.avatar}>{getInitials(data.authorFio)}</span>
            <div>
              {data.authorFio}
              <span>{data.emailAuthor}</span>
            </div>
          </div>
        </div>
        <div className={styles.infoHr}>
          <span>Исполнитель</span>
          <div className={styles.info}>
            <span className={styles.avatar}>
              {getInitials(data.fioExecutor)}
            </span>
            <div>
              {data.fioExecutor}
              <span>{data.emailExecutor}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hrWrap}>
        <div className={styles.time}>
          <Icon.Calendar />
          <div>
            Создано
            <span>{new Date(data.timeCreate).toLocaleString('ru-RU')}</span>
          </div>
        </div>
        {data?.dateTask ? (
          <div className={styles.time}>
            <Icon.Calendar />
            <div>
              Дата окончания
              <span>{new Date(data.dateTask).toLocaleString('ru-RU')}</span>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.wrapBtn}>
        <div className={styles.wrapStatus}>
          {data.actions.canStartTask ? (
            <button
              onClick={() =>
                taskApi
                  .editTaskStatus(data.id, 'process')
                  .then(() =>
                    taskApi
                      .getTasks(
                        `page=${pagination?.number}&size=${
                          pagination?.size || 10
                        }&status=${activeFilterTask}${sortTask}`
                      )
                      .then((res) => {
                        const {
                          content,
                          totalPages,
                          totalElements,
                          size,
                          number,
                        } = res
                        dispatch(setContent(content))
                        // dispatch(setPagination({ totalPages, totalElements, size, number }));
                      })
                  )
                  .then(() => setActive(false))
              }
              className={styles.disableStatus}
            >
              Взять в работу
            </button>
          ) : null}
          {data.actions.canCompleteTask ? (
            <button
              onClick={() =>
                taskApi
                  .editTaskStatus(data.id, 'completed')
                  .then(() =>
                    taskApi
                      .getTasks(
                        `page=${pagination?.number}&size=${
                          pagination?.size || 10
                        }&status=${activeFilterTask}${sortTask}`
                      )
                      .then((res) => {
                        const {
                          content,
                          totalPages,
                          totalElements,
                          size,
                          number,
                        } = res
                        dispatch(setContent(content))
                        dispatch(
                          setPagination({
                            totalPages,
                            totalElements,
                            size,
                            number,
                          })
                        )
                      })
                  )
                  .then(() => setActive(false))
              }
              className={styles.disableStatus}
            >
              Выполнить
            </button>
          ) : null}
          {data.actions.canCancelTask ? (
            <button
              onClick={() =>
                taskApi
                  .editTaskStatus(data.id, 'cancellation')
                  .then(() =>
                    taskApi
                      .getTasks(
                        `page=${pagination?.number}&size=${
                          pagination?.size || 10
                        }&status=${activeFilterTask}${sortTask}`
                      )
                      .then((res) => {
                        const {
                          content,
                          totalPages,
                          totalElements,
                          size,
                          number,
                        } = res
                        dispatch(setContent(content))
                        dispatch(
                          setPagination({
                            totalPages,
                            totalElements,
                            size,
                            number,
                          })
                        )
                      })
                  )
                  .then(() => setActive(false))
              }
              className={styles.disableStatus}
            >
              Отменить
            </button>
          ) : null}
        </div>
        <div className={styles.wrapControl}>
          {data.actions.canEditTask ? (
            <button className={styles.btnEdit} onClick={openTaskCreationWindow}>
              <Icon.Edit />
              Редактировать
            </button>
          ) : null}
          {data.actions.canDeleteTask ? (
            <button className={styles.btnEdit} onClick={openDeleteTask}>
              <Icon.Trash />
              Удалить
            </button>
          ) : null}
        </div>
      </div>

      <Modal
        open={isDeleteTask}
        closeModal={closeDeleteTask}
      >
        <DeleteTask setActive={setDeleteTask} id={data.id} />
      </Modal>
      <Modal
        open={isTaskCreationWindow}
        closeModal={closeTaskCreationWindow}
      >
        <CreatingTasks
          active={isTaskCreationWindow}
          data={props.data}
          setActive={setTaskCreationWindow}
        />
      </Modal>
    </div>
  )
}

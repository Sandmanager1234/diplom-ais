import { useState, FC, useRef } from 'react'
import classNames from 'classnames'

import { Icon, Modal } from 'UI'

import { getInitials } from 'utils/getInitials'

import { ITask } from 'services/taskApi/models'

import { useClickOutside } from 'hooks'

import { CreatingTasks } from '../CreatingTasks'

import { DeleteTask,TaskView } from './Components'

import styles from './TaskCard.module.css'

export const TaskCard: FC<ITask> = (props) => {
  const {
    id,
    priorityValue,
    name,
    description,
    timeCreate,
    dateTask,
    actions,
    authorFio,
  } = props

  const [isAction, setAction] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const open = () => setAction(true)

  const close = () => setAction(false)

  useClickOutside(ref, close, 'mousedown')

  const [isDeleteTask, setDeleteTask] = useState(false)
  const [activeTaskCreationWindow, setActiveTaskCreationWindow] =
    useState(false)
  const [isModalViewTask, setModalViewTask] = useState(false)

  const openDeleteTask = () => setDeleteTask(true)
  const openActiveTaskCreationWindow = () => setActiveTaskCreationWindow(true)
  const openModalViewTask = () => setModalViewTask(true)

  const closeDeleteTask = () => setDeleteTask(false)
  const closeActiveTaskCreationWindow = () => setActiveTaskCreationWindow(false)
  const closeModalViewTask = () => setModalViewTask(false)

  const prioritise = classNames({
    [styles[priorityValue.toLowerCase()]]: true,
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.leftSide}>
        <div className={prioritise}></div>
        <div className={styles.info}>
          <button
            className={styles.taskName}
            onClick={openModalViewTask}
          >
            {name}
          </button>
          <span className={styles.taskDescription}>{description}</span>
          <div className={styles.date}>
            <span className={styles.timeCreate}>
              Создано: {new Date(timeCreate).toLocaleString('ru-RU')}
            </span>
            {dateTask ? (
              <span className={styles.timeResolve}>
                Дата решения: {new Date(dateTask).toLocaleString('ru-RU')}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.avatar}>{getInitials(authorFio)}</div>
        {actions.canEditTask || actions.canDeleteTask ? (
          <button className={styles.bntActionMenu} onClick={open}>
            <Icon.MoreVertical />
          </button>
        ) : (
          <div className={styles.bntActionMenu}></div>
        )}
        {isAction ? (
          <div className={styles.actionMenu} ref={ref}>
            {actions.canEditTask ? (
              <button
                className={styles.btnAction}
                onClick={openActiveTaskCreationWindow}
              >
                <Icon.Edit />
                Редактировать
              </button>
            ) : null}
            {actions.canDeleteTask ? (
              <button
                className={styles.btnAction}
                onClick={openDeleteTask}
              >
                <Icon.Trash />
                Удалить задачу
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <Modal open={isDeleteTask} closeModal={closeDeleteTask}>
        <DeleteTask setActive={setDeleteTask} id={id} />
      </Modal>
      <Modal
        open={activeTaskCreationWindow}
        closeModal={closeActiveTaskCreationWindow}
      >
        <CreatingTasks
          active={activeTaskCreationWindow}
          data={props}
          setActive={setActiveTaskCreationWindow}
        />
      </Modal>
      <Modal open={isModalViewTask} closeModal={closeModalViewTask}>
        <TaskView setActive={setModalViewTask} data={props} />
      </Modal>
    </div>
  )
}

import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'

import {Icon, Modal} from "UI";
import { CreateEventModal } from 'UI/Modal/Components/CreateEventModal'

import {useClickOutside} from "hooks";

import { getInitials } from 'utils/getInitials'

import {IMeeting} from "services/models";

import DeleteMeetingModal from './Components/DeleteMeetingModal'

import styles from './CalendarEvent.module.css'

interface ICalendarEvent {
  data: IMeeting,
  currentDate: string,
  variant?: string
}

export const CalendarEvent: React.FC<ICalendarEvent> = (props) => {

  const { data, currentDate, variant = 'default' } = props

  const [isModal, setModal] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const open = () => setModal(true)

  const close = () => setModal(false)

  useClickOutside(ref, close, 'mousedown')

  const [isModalEdit, setActiveEdit] = useState<boolean>(false)
  const [isModalDelete, setActiveDelete] = useState<boolean>(false)
  const [mouseClientX, setMouseClientX] = useState<number>(0)

  const openModalEdit = () => setActiveEdit(true)
  const openModalDelete = () => setActiveDelete(true)

  const closeModalEdit = () => setActiveEdit(false)
  const closeModalDelete = () => setActiveDelete(false)

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }

  const formatterDate = new Intl.DateTimeFormat('ru', dateOptions)

  // const getHeight = () => {
  //   if (new Date(data.startDate).getDate() !== new Date(data.endDate).getDate()) {
  //     if (new Date(currentDate).getDate() === new Date(data.startDate).getDate()) {
  //       return ((new Date(new Date(data.endDate).getFullYear(), new Date(data.endDate).getMonth(), new Date(data.startDate).getDate(),
  //         19).getTime() - new Date(data.startDate).getTime()) / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1);
  //     } else if (new Date(currentDate).getDate() === new Date(data.endDate).getDate()) {
  //       return ((new Date(data.endDate).getTime() - new Date(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth(), new Date(currentDate).getDate(), 8).getTime())
  //         / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1);
  //     } else {
  //       return 615;
  //     }
  //   } else {
  //     if (new Date(data.endDate).getHours() >= 19 && new Date(data.startDate).getHours() <= 7) {
  //       return ((new Date(new Date(data.endDate).getFullYear(), new Date(data.endDate).getMonth(), new Date(data.endDate).getDate(), 19).getTime()
  //           - new Date(new Date(data.startDate).getFullYear(), new Date(data.startDate).getMonth(), new Date(data.startDate).getDate(), 8).getTime())
  //         / 3600000 * 55 + 19 - 8 - 1);
  //     } else if (new Date(data.endDate).getHours() >= 19) {
  //       return ((new Date(new Date(data.endDate).getFullYear(), new Date(data.endDate).getMonth(), new Date(data.endDate).getDate(), 19).getTime()
  //           - new Date(data.startDate).getTime())
  //         / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1);
  //     } else if (new Date(data.startDate).getHours() <= 7) {
  //       return ((new Date(data.endDate).getTime() - new Date(new Date(data.startDate).getFullYear(), new Date(data.startDate).getMonth(), new Date(data.startDate).getDate(), 8).getTime())
  //         / 3600000 * 55 + new Date(data.endDate).getHours() - 8 - 1);
  //     }
  //     return ((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / 3600000 * 55 + new Date(data.endDate).getHours() - new Date(data.startDate).getHours() - 1);
  //   }
  // };

  const getHeight = () => {
    if (new Date(data.endDate).getHours() >= 19 || new Date(data.startDate).getHours() <= 8) {
      if (new Date(data.endDate).getHours() >= 19 && new Date(data.startDate).getHours() <= 8) {
        return 616
      }
      if (new Date(data.endDate).getHours() >= 19) {
        return ((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 19, 0).getTime()
          - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(data.startDate).getHours(),
            new Date(data.startDate).getMinutes()).getTime()) / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1)
      }
      if (new Date(data.startDate).getHours() <= 8) {
        return ((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(data.endDate).getHours(), new Date(data.endDate).getMinutes()).getTime()
          - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9,
            0).getTime()) / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1)
      }
    } else {
      return ((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(data.endDate).getHours(), new Date(data.endDate).getMinutes()).getTime()
        - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date(data.startDate).getHours(), new Date(data.startDate).getMinutes()).getTime()) / 3600000 * 55 + 19 - new Date(data.startDate).getHours() - 1)
    }
  }

  const getTop = () => {
    if (new Date(data.startDate).getHours() <= 7) {
      return 61
    }
    return ((new Date(data.startDate).getHours() + new Date(data.startDate).getMinutes() / 60 - 8) * 56 + 61)
  }

  return (
    <div
      className={variant === 'right' ? styles.activeRowRight : variant === 'left' ? styles.activeRowLeft : styles.activeRow}
      style={{
        top: getTop(),
        height: getHeight(),
        borderLeft: `8px solid ${data.applicantFio ? '#48C95F' : '#2969FF'}`,
      }}
      onMouseEnter={(e) => {
        {
          setMouseClientX(e.clientX)
          open()
        }
      }}
      onMouseLeave={() =>
        close()
      }
    >
            <span>
                {data.name}
            </span>
      <div className={styles.wrapModal}>
        {
          isModal ?
            <div
              style={{
                top: -225,
                right: window.screen.width - mouseClientX < 450 ? 0 : -375,
              }}
              ref={ref} onClick={(e) => e.stopPropagation()}
              className={styles.modal}>
              <div className={styles.title}>
                                <span>
                            {data.name}
                                </span>
              </div>
              <div className={styles.blockInfo}>
                <div className={styles.ellipse}>
                  <Icon.Clock />
                </div>
                <div>
                  <span>Время проведения</span>
                  {new Date(data.startDate).getHours()}:{new Date(data.startDate).getMinutes().toString().length > 1 ?
                  new Date(data.startDate).getMinutes() : `0${new Date(data.startDate).getMinutes()}`} -
                  {new Date(data.endDate).getHours()}:{new Date(data.endDate).getMinutes().toString().length > 1 ?
                  new Date(data.endDate).getMinutes() : `0${new Date(data.endDate).getMinutes()}`},
                  {` ${formatterDate.format(new Date(data.startDate))}`}
                </div>
              </div>
              {data.authorFio ?
                <div className={styles.blockInfo}>
                  <div className={styles.ellipse}>{getInitials(data.authorFio)}</div>
                  <div>
                    <span>Организатор</span>
                    {data.authorFio}
                  </div>
                </div>
                : null}
              {
                data.applicantFio ?
                  <div className={styles.blockInfo}>
                    <div className={styles.ellipse}>{getInitials(data.applicantFio)}</div>
                    <div>
                      <span>Соискатель</span>
                      <Link to={`/applicant/${data.applicantId}`}>
                        {data.applicantFio}
                      </Link>
                    </div>
                  </div>
                  : null
              }
              <div className={styles.btnWrap}>
                <button className={styles.btnAction} onClick={openModalEdit}>
                  <Icon.Edit />Редактировать
                </button>
                <button className={styles.btnAction} onClick={openModalDelete}>
                  <Icon.Trash />Удалить
                </button>
              </div>
            </div>
            : null
        }
      </div>
      <Modal open={isModalEdit} closeModal={closeModalEdit}>
        <CreateEventModal active={isModalEdit} data={data} setActive={setActiveEdit} />
      </Modal>
      <Modal open={isModalDelete} closeModal={closeModalDelete}>
        <DeleteMeetingModal id={data.id} setActive={setActiveDelete} />
      </Modal>
    </div>
  )
}

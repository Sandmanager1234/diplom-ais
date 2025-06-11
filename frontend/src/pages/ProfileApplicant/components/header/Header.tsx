import { useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { Icon, Modal } from 'UI'
import { useAppDispatch } from 'store'

import DeleteModal from '../deleteModal/DeleteModal'
import { setCurrentResume } from '../../../../store/slices/resumeSlice'
import {  ApplicantNotificationViewModal } from './Components'

import { useClickOutside } from 'hooks'

import styles from './Header.module.css'

export const Header = () => {
  const { id } = useParams()

  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [isNotificationModal, setNotificationModal] = useState(false)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const refModalDeleteActive = useRef<HTMLDivElement>(null)
  const refNotificationModal = useRef<HTMLDivElement>(null)

  const openModalDeleteActive = () => setModalDeleteActive(true)
  const openNotificationModal = () => setNotificationModal(true)

  const closeModalDeleteActive = () => setModalDeleteActive(false)
  const closeNotificationModal = () => setNotificationModal(false)

  useClickOutside(refModalDeleteActive, closeModalDeleteActive, 'mousedown')
  useClickOutside(refNotificationModal, closeNotificationModal, 'mousedown')


  return (
    <div className={styles.header}>
      <div className={styles.navButtons}>
        <NavLink
          onClick={() => dispatch(setCurrentResume(''))}
          to='/'
          className={styles.navLink}
        >
          Главная
        </NavLink>
        <Icon.ArrowChewronRight />
        <div className={styles.disabledLink}>Резюме</div>
      </div>
      <div className={styles.settings}>
        <button
          className={styles.secondaryBtn}
          onClick={() => {
            window.open('/applicantForm', '_blank')
          }}
        >
          Сформировать ссылку на анкету
        </button>
        <button className={styles.bellBtn} onClick={openNotificationModal}>
          <Icon.BellPlus />
        </button>
        <button
          className={styles.secondaryBtn}
          onClick={() => {
            navigate(`/edit-resume/${id}`)
          }}
        >
          <Icon.Edit />
        </button>
        <button className={styles.secondaryBtn} onClick={openModalDeleteActive}>
          <Icon.Trash />
        </button>
      </div>
      <Modal
        ref={refModalDeleteActive}
        open={modalDeleteActive}
        closeModal={closeModalDeleteActive}
      >
        <DeleteModal setActive={setModalDeleteActive} id={id} />
      </Modal>
      <Modal
        ref={refNotificationModal}
        open={isNotificationModal}
        closeModal={closeNotificationModal}
      >
        <ApplicantNotificationViewModal
          active={isNotificationModal}
          setActive={setNotificationModal}
        />
      </Modal>
    </div>
  )
}

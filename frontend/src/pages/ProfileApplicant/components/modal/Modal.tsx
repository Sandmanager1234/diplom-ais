import React, { useEffect } from 'react'

import { Icon } from 'UI'
import { useAppDispatch } from 'store'
import { setIsModalWindowDelete } from '../../../../store/slices/resumeSlice'
import styles from './Modal.module.css'

interface IModal {
  active: boolean
  setActive: React.Dispatch<boolean>
  children: React.ReactNode
  setActiveForm?: React.Dispatch<boolean>
}



export const Modal: React.FC<IModal> = ({
  active,
  setActive,
  setActiveForm,
  children,
}) => {
  useEffect(() => {
    active
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [active])

  const dispatch = useAppDispatch()

  return (
    <div
      className={active ? styles.modalActive : styles.hidden}
      onClick={() => {
        setActive(false)
        dispatch(setIsModalWindowDelete(false))
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeModal}
          onClick={() => {
            setActive(false)
            dispatch(setIsModalWindowDelete(false))
          }}
        >
          <Icon.Cross />
        </button>
        {children}
      </div>
    </div>
  )
}

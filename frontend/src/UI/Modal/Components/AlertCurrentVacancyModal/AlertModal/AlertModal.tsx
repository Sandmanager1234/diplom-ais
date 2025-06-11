import { createPortal } from 'react-dom'
import React from 'react'
import styles from './AlertModal.module.css'

interface IProps {
  children: React.ReactNode
}

const AlertModal = ({children} : IProps) => {
  return (
    createPortal(
      <div className={styles.wrap}>
        {children}
      </div>
      , document.body)
  )
}

export default AlertModal

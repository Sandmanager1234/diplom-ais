import {
  forwardRef,
  MouseEvent,
  ReactNode,
  useEffect,
} from 'react'

import { Icon } from 'UI'

import styles from './Content.module.css'

type Props = {
  children: ReactNode
  onClick: () => void
}

const Content = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { onClick, children } = props

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      onMouseDown={onClick}
      ref={ref}
      className={styles.modalActive}
    >
      <div onMouseDown={(e)=>e.stopPropagation()} className={styles.modalContent}>
        <button className={styles.closeModal} onClick={onClick}>
          <Icon.Cross />
        </button>
        {children}
      </div>
    </div>
  )
})

export default Content

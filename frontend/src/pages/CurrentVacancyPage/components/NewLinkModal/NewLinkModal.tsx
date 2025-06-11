import styles from './NewLinkModal.module.css'
import { createPortal } from 'react-dom'
import { ShortSearchBar } from '../ShortSearchBar'
import { forwardRef } from 'react'

interface IProps {
  setOpenModal: (value: boolean) => void
  openModal: boolean
}

const NewLinkModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { setOpenModal } = props
  return (
    <>
      {createPortal(
        <div className={styles.newLinkModal}>
          <div className={styles.wrap} ref={ref}>
            <ShortSearchBar setOpenModal={setOpenModal} />
          </div>
        </div>,
        document.body
      )}
    </>
  )
})

export default NewLinkModal

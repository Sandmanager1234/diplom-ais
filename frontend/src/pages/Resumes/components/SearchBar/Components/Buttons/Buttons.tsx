import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon, Modal } from 'UI'

import { ImportModal } from 'UI/SideBar/Components/ImportModal'

import styles from './Buttons.module.css'

const Buttons = () => {
  const [isActiveImportModal, setIsActiveImportModal] = useState(false)

  const open = () => setIsActiveImportModal(true)

  const close = () => setIsActiveImportModal(false)

  return (
    <>
      <div className={styles.buttonsLarge}>
      <button
          onClick={open}
          className={styles.secondary}
        >
          {<Icon.ArrowExport />}
          
        </button>
        <Link to='/new-resume' className={styles.link}>
          <button className={styles.primary}>
            {<Icon.UserPlus />}
            <div
              className={styles.titleNavLink}
            >
              Создать резюме
            </div>
          </button>
        </Link>
        
      </div>
      <Modal open={isActiveImportModal} closeModal={close}>
        <ImportModal
          active={isActiveImportModal}
          setActive={setIsActiveImportModal}
        />
      </Modal>
    </>
  )
}

export default Buttons

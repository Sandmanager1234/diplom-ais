import { ReactNode, useState, useRef, FC } from 'react'
import { createPortal } from 'react-dom'

import { Content, ExitConfirmation } from './Components'
import { CURRENT_ACTION } from './data/models'

interface Modal {
  open: boolean
  children: ReactNode
  exitConfirmation?: boolean
  actionType?: CURRENT_ACTION
  closeModal: () => void
}

const Modal: FC<Modal> = ({
  open,
  closeModal,
  children,
  exitConfirmation,
  actionType,
}) => {
  const [openExitConfirmation, setOpenExitConfirmation] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  if (!open) return null
 
  const onClick = () => {
    if (exitConfirmation) setOpenExitConfirmation(true)
    else closeModal()
  }

  const closeExitConfirmation = () => setOpenExitConfirmation(false)

  const closeAllModal = () => {
    closeModal()
    setOpenExitConfirmation(false)
  }

  return (
    <>
      {openExitConfirmation &&
        actionType &&
        createPortal(
          <ExitConfirmation
            actionType={actionType}
            closeExitConfirmation={closeExitConfirmation}
            closeAllModal={closeAllModal}
          />,
          document.body
        )}
      {createPortal(
        <Content ref={ref} onClick={onClick}>
          {children}
        </Content>,
        document.body
      )}
    </>
  )
}

export default Modal

import { Dispatch, SetStateAction } from 'react'

import { Icon } from 'UI'
import { TAttachment } from 'services/models'

import styles from './Documents.module.css'

type DocumentsProps = {
  attachments: TAttachment[]
  setActiveDocumentsModal: Dispatch<SetStateAction<boolean>>
}

export const Documents = (props: DocumentsProps) => {
  const { attachments, setActiveDocumentsModal } = props

  return (
    <div className={styles.documentsContainer}>
      <div className={styles.documentsWrapper}>
        <h3 className={styles.documentsHeader}>Документы</h3>
        <button
          onClick={() => setActiveDocumentsModal((prevState) => !prevState)}
        >
          <Icon.PlusMini />
        </button>
      </div>
      {attachments.map((doc, index) => (
        <div className={styles.document} key={index}>
          <Icon.FileProfile />
          <p>{doc.name}</p>
        </div>
      ))}
    </div>
  )
}

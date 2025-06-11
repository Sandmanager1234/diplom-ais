import { FC, Dispatch } from 'react'
import { CSVLink } from 'react-csv'
import { Icon } from 'UI/index'

import styles from './StatusImportedModal.module.css'

interface IStatusImportedModalProps {
  setActive: Dispatch<boolean>
  setActiveMain: Dispatch<boolean>
  isActive: boolean
  resBody: {
    status: string
    fileName: string
    applicantId: string
    errorText: string
  }[]
}

export const StatusImportedModal: FC<IStatusImportedModalProps> = (props) => {
  const errorCount = props.resBody.filter((item) => item.status === 'ERROR')
  const importedCount = props.resBody.filter(
    (item) => item.status === 'IMPORTED'
  )
  const duplicatedCount = props.resBody.filter(
    (item) => item.status === 'DUPLICATE'
  )

  const headers = [
    { label: 'Имя файла', key: 'fileName' },
    { label: 'Статус', key: 'status' },
    { label: 'Ошибка', key: 'errorText' },
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Статус импортированых резюме</div>
      <div className={styles.successImport}>
        <span>
          <p>Импортировано</p>
          {importedCount.length} резюме
        </span>
        <Icon.Success />
      </div>
      <div className={styles.errorImport}>
        <span>Ошибка при импорте</span>
        {errorCount.length} резюме
      </div>
      <div className={styles.errorImport}>
        <span>Дубликаты при импорте</span>
        {duplicatedCount.length} резюме
      </div>
      <CSVLink
        data={props.resBody}
        headers={headers}
        filename='data.csv'
        separator={';'}
        className={styles.btnDownload}
      >
        Скачать отчёт
      </CSVLink>
      {/*<button className={styles.btnSubmit} onClick={() => {*/}
      {/*  props.setActiveMain(false)*/}
      {/*  props.setActive(false)*/}
      {/*}}>Ок</button>*/}
    </div>
  )
}

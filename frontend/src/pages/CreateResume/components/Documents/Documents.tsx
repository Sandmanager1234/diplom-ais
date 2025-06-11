import React, { useState } from 'react'
import { BtnSaveResume, Icon } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import {
  deleteAttachment,
  setAttachments,
} from '../../../../store/slices/createResumeSlice'
import { CreateResumeStep } from '../../data/models'
import styles from './Documents.module.css'

interface IDocuments {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
}

const Documents = (props: IDocuments) => {
  const { setActiveStep, activeStep } = props
  const { fields } = useAppSelector((state) => state.createResume)
  const dispatch = useAppDispatch()
  const [filesData, setFilesData] = useState<File[]>([])

  const uploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files || [])
    setFilesData(filesArray)
    const allNamesFiles = fields.attachments.map((item) => item.name)
    filesArray.forEach((file, index) => {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (
        ['pdf', 'doc', 'docx', 'rtf', 'xlsx', 'xls'].includes(extension) &&
        !allNamesFiles.includes(file.name)
      ) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          const base64result = event.target?.result?.split(',')[1]
          if (base64result) {
            dispatch(
              setAttachments({
                id: fields.attachments.length + index,
                name: file.name,
                extension: extension,
                content: base64result,
              })
            )
          }
        }
      }
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Документы</div>
      <div className={styles.subTitle}>
        Вы можете прикрепить необходимые документы
      </div>
      <div className={styles.containerDragAndDrop}>
        <div className={styles.documentPlus}>
          <Icon.FilePlus />
        </div>
        <div className={styles.documentTitle}>
          Выберите файлы или перетащите их сюда
        </div>
        <div className={styles.documentSubtitle}>
          Поддерживается .pdf, .doc, .docx, .xlsx, .xls и .rtf.
        </div>
        <input
          className={styles.inputFile}
          multiple
          onChange={uploadDocument}
          type='file'
          accept={'.pdf, .doc, .docx, .rtf, .xlsx, .xls'}
        />
      </div>
      <div className={styles.wrapBtn}>
        <button
          className={styles.btnBack}
          onClick={() =>
            setActiveStep(
              activeStep.map((item) =>
                item.id === 6
                  ? {
                      ...item,
                      isActive: true,
                      isVisited: true,
                    }
                  : { ...item, isActive: false }
              )
            )
          }
        >
          Назад
        </button>
        <BtnSaveResume
          disabled={!!activeStep.filter((item) => item.isError).length}
        />
      </div>
      <div className={styles.wrapDocuments}>
        {fields.attachments.length
          ? fields.attachments.map((document) => (
              <div className={styles.itemDocument} key={document.id}>
                <div>
                  <Icon.File /> {document.name}
                </div>
                <button
                  className={styles.deleteDoc}
                  id={document.id.toString()}
                  onClick={(e) =>
                    dispatch(
                      deleteAttachment(
                        fields.attachments.filter(
                          (item) => item.id != e.target.id
                        )
                      )
                    )
                  }
                ></button>
                <Icon.CrossOption />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Documents

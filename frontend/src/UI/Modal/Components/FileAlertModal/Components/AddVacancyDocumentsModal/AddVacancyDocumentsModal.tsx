import React, { useEffect, useRef, useState } from 'react'

import { Icon } from 'UI'

import styles from './AddVacancyDocumentsModal.module.css'
import { createPortal } from 'react-dom'
import { useAppDispatch } from 'store'
import { resumesApi } from 'services/resumesApi/resumesApi'
import { setVacancyApplicantState } from 'store/reducers/currentVacancyReducer'
import { Applicant } from 'services/resumesApi/models'
import { AxiosResponse } from 'axios'

type AddDocumentsModalProps = {
  active: boolean
  setActive: (active: boolean) => void
  uploader: (file: any) => Promise<AxiosResponse>
  chosenOption?: 'screening' | 'sendOffer'
  candidate?: Applicant
  fileComplete?: () => void
  fileFailed?: () => void
}

const DOCUMENTS_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rtf']

export const AddVacancyDocumentsModal = (props: AddDocumentsModalProps) => {
  const { active, setActive, uploader, chosenOption, candidate, fileComplete, fileFailed } =
    props
  const ref = useRef<null>(null)
  const dispatch = useAppDispatch()

  const [filesData, setFilesData] = useState<File[]>([])

  const uploadDocument = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const suitableFiles = []
      const formData = new FormData()
      for (let i = 0; i < evt.target.files.length; i++) {
        const extension = evt.target.files[i].name.substring(
          evt.target.files[i].name.lastIndexOf('.') + 1
        )
        if (DOCUMENTS_EXT.includes(extension)) {
          formData.append('document', evt.target.files[i])
          suitableFiles.push(evt.target.files[i])
        }
      }
      setFilesData((prev) => [...prev, ...suitableFiles])
    }
  }

  const handleSubmit = (
    evt: React.InputHTMLAttributes<HTMLInputElement>,
    files: File[]
  ) => {
    const formData = new FormData()
    for (const i in files) {
      formData.append('file', files[i])
    }
    if (chosenOption && chosenOption === 'sendOffer') {
      resumesApi.checkFileExists(candidate.relationshipId!, 'OFFER')
      .then((response) => {
        if (response.data) {
          if (fileFailed) {
            fileFailed()
          }
          setActive(false)
        } else {
          resumesApi
          .editStatusApplicant(candidate.relationshipId!, 'send-offer')
          .then(() => {
            try {
              dispatch(
                setVacancyApplicantState({ id: candidate.id, status: chosenOption })
              )
            }
            catch {}
            uploader(formData)
              .then(() => {
                fileComplete()
              })
              .catch((e) => {
                console.log(e)
              })
          })
        }
      })
      .finally(() => {
        setActive(false)
      })
      return
    }
    uploader(formData)
      .catch(() => alert('Файл не удалось прикрепить. Повторите операцию.'))
    setActive(false)
  }
  useEffect(() => {
    !active && setFilesData([])
  }, [active])

  return (
    <>
      {createPortal(
        <div className={styles.wrap}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event, filesData)
            }}
            className={styles.form}
          >
            <button
              className={styles.closeModal}
              onClick={() => setActive(false)}
            >
              <Icon.Cross />
            </button>
            <h2 className={styles.title}>Добавить документы</h2>
            <p className={styles.subTitle}>
              Укажите источник для загрузки документов и загрузите необходимые
              файлы
            </p>
            <div className={styles.downloadContainer}>
              <div className={styles.addFile}>
                <Icon.FilePlus />
              </div>
              <h3 className={styles.downloadTitle}>
                Выберите файлы или перетащите их сюда
              </h3>
              <p className={styles.downloadSubtitle}>
                Поддерживается .pdf, .doc, .docx, .xls, .xlsx и .rtf.
              </p>
              <input
                ref={ref}
                className={styles.inputFile}
                multiple={true}
                type='file'
                accept={'.pdf, .doc, .docx, .rtf, .xlsx, .xls'}
                onDrop={uploadDocument}
                onChange={uploadDocument}
              />
            </div>
            <div className={styles.filesWrap}>
              {filesData.map((file, index) => (
                <div className={styles.uploadedFile} key={index}>
                  <div className={styles.fileName}>
                    <Icon.File /> {file.name}
                  </div>
                  <button
                    type='button'
                    onClick={() =>
                      setFilesData(filesData.filter((file, id) => id !== index))
                    }
                    className={styles.deleteUploadedFile}
                  >
                    <Icon.CrossOption />
                  </button>
                </div>
              ))}
            </div>
            <button
              type='submit'
              className={styles.uploadBtn}
              disabled={!filesData.length}
            >
              Добавить
            </button>
          </form>
        </div>,
        document.body
      )}
    </>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { useAppDispatch } from 'store'
import { setAttachments } from 'store/slices/createResumeSlice'
import { Icon } from 'UI'
import { resumesApi } from 'services/resumesApi/resumesApi'
import { ApplicantCard } from 'services/resumesApi/models'

import styles from './AddDocumentsModal.module.css'

type AddDocumentsModalProps = {
  active: boolean
  setActive: (active: boolean) => void
}

const DOCUMENTS_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rtf']

export const AddDocumentsModal = (props: AddDocumentsModalProps) => {
  const { active, setActive } = props
  const ref = useRef<null>(null)

  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isDoubleSummary, setIsDoubleSummary] = useState(false)
  const [filesData, setFilesData] = useState<File[]>([])
  const [applicant, setApplicant] = useState<ApplicantCard>()
  useEffect(() => {
    resumesApi
      .getApplicant(id)
      .then((res) => setApplicant(res))
      .catch((error) => {
        console.error(`Ошибка: ${error}`)
        navigate('/', { replace: true })
      })
  }, [])

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
    if (id)
      resumesApi.addDocumentByIdApplicant(id, formData).then(() => {
        setActive(false)

        for (const i in files) {
          const extension = files[i].name.substring(
            files[i].name.lastIndexOf('.') + 1
          )
          if (DOCUMENTS_EXT.includes(extension)) {
            const reader = new FileReader()
            reader.onload = (event) => {
              const base64Result = event.target?.result as string
              const base64Content = base64Result?.split(',')[1]
              if (base64Content) {
                dispatch(
                  setAttachments({
                    id: applicant?.attachments?.length + i,
                    name: files[i].name,
                    extension: extension,
                    content: base64Content,
                  })
                )
              }
            }
            reader.readAsDataURL(files[i])
          }
          /*if (applicant) {
              const postBody = getApplicantEdit(applicant)
              statisticsApi
                .editApplicant({
                  id,
                  ...postBody,
                  favouriteListIds: applicant.favouriteListIds,
                })
                .catch((error) => console.error(`Ошибка: ${error}`))
            }*/
        }
      })
  }
  useEffect(() => {
    !active && setFilesData([])
  }, [active])

  const formStyles = classNames({
    [styles.hiddenWrap]: isDoubleSummary,
    [styles.wrap]: !isDoubleSummary,
  })
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(event, filesData)
        }}
        className={formStyles}
      >
        <h2 className={styles.title}>Добавить документы</h2>
        <p className={styles.subTitle}>
          Укажите источник для загрузки документов и загрузите необходимые файлы
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
    </>
  )
}

import { useEffect, useRef, useState, ChangeEvent, FormEvent, FC } from 'react'
import { useDispatch } from 'react-redux'

import { Icon, Modal } from 'UI'
import { setResumes } from 'store/slices/resumeSlice'
import { DoubleSummaryModal, StatusImportedModal } from './Components'
import { importResumeApi } from 'services/importResumeApi/importResumeApi'
import { resumesApi } from 'services/resumesApi/resumesApi'

import { SizeValidtion } from './data/models'
import { FILE_FORMATS } from './data/constants'

import { checkingSizeOfAllFiles } from './services/checkingSizeOfAllFiles'
import { checkFormatFileAndSizeValidation } from './services/checkFormatFileAndSizeValidation'

import styles from './ImportModal.module.css'

type Props = {
  setActive: (a: boolean) => void
  active: boolean
}

export const ImportModal: FC<Props> = (props) => {
  const { setActive, active } = props
  const ref = useRef(null)

  const [allFiles, setAllFiles] = useState<File[]>([])
  const [isStatusModal, setIsStatusModal] = useState(false)
  const [isDoubleSummary, setDoubleSummary] = useState(false)
  const [resBody, setResBody] = useState([])
  const [disabledImport, setDisabledImport] = useState(true)

  const [sizeValidation, setSizeValidation] = useState(SizeValidtion.AcceptableSize)

  useEffect(() => {
    setDisabledImport(!allFiles.length)
  }, [allFiles])

  useEffect(() => {
    setSizeValidation(checkingSizeOfAllFiles(allFiles))
  }, [allFiles])

  const openStatusModal = () => setIsStatusModal(true)
  const openDoubleSummary = () => setDoubleSummary(true)

  const closeStatusModal = () => setIsStatusModal(false)
  const closeDoubleSummary = () => setDoubleSummary(false)

  const setDocument = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const suitableFiles = []
      const formData = new FormData()
      for (let i = 0; i < evt.target.files.length; i++) {
        if (checkFormatFileAndSizeValidation(evt.target.files[i],sizeValidation)) {
          formData.append('document', evt.target.files[i])
          suitableFiles.push(evt.target.files[i])
        }
      }
      setAllFiles([...allFiles, ...suitableFiles])
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (!active) {
      setAllFiles([])
    }
  }, [active])

  const handleSubmitImport = (evt: FormEvent<HTMLFormElement>) => {
    setDisabledImport(true)
    const formData = new FormData()
    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles.at(i) as File
      if (
        FILE_FORMATS.includes(
          file.name.substring(file.name.lastIndexOf('.') + 1)
        )
      ) {
        formData.append('document', file)
      }
    }
    evt.preventDefault()
    if (allFiles.length === 1) {
      importResumeApi
        .importApplicant('CV_HEAD_HUNTER', formData, true)
        .then((res) => {
          setTimeout(() => {
            if (res.data.at(0)?.status === 'DUPLICATE') {
              openDoubleSummary()
            } else {
              setResBody(res.data)
              openStatusModal()
            }
          }, 0)
          resumesApi.getApplicants(`page=0&size=10`).then(({data}) => {
            dispatch(setResumes(data.content))
          })
        })
    } else {
      importResumeApi
        .importApplicant('CV_HEAD_HUNTER', formData, true)
        .then((res) => {
          setTimeout(() => {
            setResBody(res.data)
          }, 0)
        })
        .finally(() => {
          resumesApi.getApplicants(`page=0&size=10`).then(({data}) => {
            dispatch(setResumes(data.content))
            openStatusModal()
          })
        })
    }
  }

  return (
    <>
      <form
        onSubmit={(evt) => handleSubmitImport(evt)}
        className={isDoubleSummary ? styles.hiddenWrap : styles.wrap}
      >
        <div className={styles.title}>Импортировать резюме</div>
        <div className={styles.subtitle}>
          Укажите источник для загрузки резюме и загрузите необходимые файлы
        </div>
        <div className={styles.download}>
          <div className={styles.addFile}>
            <Icon.FilePlus />
          </div>
          <div className={styles.downloadTitle}>
            Выберите файлы или перетащите их сюда
          </div>
          <div className={styles.downloadSubtitle}>
            Поддерживается .docx/.doc
          </div>
          <input
            ref={ref}
            className={styles.inputFile}
            id='file'
            onChange={(evt) => setDocument(evt)}
            multiple={true}
            type='file'
            value={''}
            title=''
            accept='.docx,.doc'
          />
        </div>
        {sizeValidation === SizeValidtion.ExceededSize && (
          <div className={styles.sizeError}>Размер всех файлов превышен. Допустимый размер - 10Мб</div>
        )}
        <div className={styles.filesWrap}>
          {!!allFiles.length &&
            allFiles.map((item, index) => (
              <div className={styles.uploadedFile} key={index}>
                <div className={styles.fileName}>
                  <Icon.File />
                  <span>{item.name}</span>
                </div>
                <button
                  type={'button'}
                  onClick={() =>
                    setAllFiles(allFiles.filter((_file, id) => id !== index))
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
          className={styles.btnImport}
          disabled={disabledImport}
        >
          Импорт
        </button>
      </form>
      <Modal open={isDoubleSummary} closeModal={closeDoubleSummary}>
        <DoubleSummaryModal
          document={allFiles}
          isDoubleSummary={isDoubleSummary}
          setDoubleSummary={setDoubleSummary}
          setMainActive={setActive}
        />
      </Modal>
      <Modal open={isStatusModal} closeModal={closeStatusModal}>
        <StatusImportedModal
          setActiveMain={setActive}
          resBody={resBody}
          setActive={setIsStatusModal}
          isActive={isStatusModal}
        />
      </Modal>
    </>
  )
}

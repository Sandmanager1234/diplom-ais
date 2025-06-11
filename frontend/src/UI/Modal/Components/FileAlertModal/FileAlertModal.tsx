import { useEffect, useState } from "react"
import AlertModal from "../AlertCurrentVacancyModal/AlertModal/AlertModal"
import styles from './FileAlertModal.module.css'
import { Icon } from "UI"
import { AddVacancyDocumentsModal } from "./Components/AddVacancyDocumentsModal"
import { applicantVacancyApi } from "services/applicant-vacancyApi/applicant-vacancyApi"
import { Applicant } from "services/resumesApi/models"

interface IProps {
  alertModalContent: 'screeningFileAlert'
    | 'screeningFileComplete'
    | 'screeningFileSkipped'
    | 'sendOfferFileAlert'
    | 'sendOfferFileComplete'
    | 'sendOfferFileSkipped'
    | '',
  candidate: Applicant,
  chosenOption: 'screening' | 'sendOffer',
  onClose?: () => void,
  onFileComplete?: () => void
}

const filetypes = {
  ['screening']: 'SCREENING',
  ['sendOffer']: 'OFFER',
}

const FileAlertModal = (props: IProps) => {
  const candidate = props.candidate
  const chosenOption = props.chosenOption
  const [alertModalContent, setAlertModalContent] = useState(props.alertModalContent)
  const [openDocumentsModalScreening, setOpenDocumentsModalScreening] =
    useState(false)

  const uploader = (file: any) => {
    return applicantVacancyApi.addDocumentById(
      candidate.relationshipId,
      filetypes[chosenOption],
      file
    )
  }

  const fileComplete = () => {
    setAlertModalContent('sendOfferFileComplete')
    if (props.onFileComplete) {
      props.onFileComplete()
    }
  }

  useEffect(() => {
    if (props.onClose && (
        alertModalContent === '' && !openDocumentsModalScreening)) {
      props.onClose()
    }
  }, [alertModalContent, openDocumentsModalScreening])

  return (
    <>
    {!!alertModalContent && (
    <AlertModal>
      <div className={styles.alertModalWrapper}>
        {alertModalContent === 'screeningFileAlert' && (
          <div>
            <div className={styles.screeningFileAlert}>
              <h3 className={styles.title}>Прикрепите файл «Скрининга»</h3>
              <button
                onClick={() => setAlertModalContent('')}
                className={styles.closeModal}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <span className={styles.text}>
              Обратите внимание, файл «Скрининга» не был прикреплен
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => {
                  setAlertModalContent('')
                  setOpenDocumentsModalScreening(true)
                }}
              >
                Подкрепить
              </button>
              <button
                className={styles.modalButtonWhite}
                onClick={() => setAlertModalContent('screeningFileSkipped')}
              >
                Пропустить
              </button>
            </div>
          </div>
        )}
        {alertModalContent === 'screeningFileSkipped' && (
          <>
            <div className={styles.screeningFileAlert}>
              <h3 className={styles.title}>Статус изменён на скрининг</h3>
              <button
                className={styles.closeModal}
                onClick={() => setAlertModalContent('')}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <span className={styles.text}>
              Файл скрининга не был прикреплён
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => setAlertModalContent('')}
              >
                Закрыть
              </button>
            </div>
          </>
        )}
        {alertModalContent === 'screeningFileComplete' && (
          <>
            <div className={styles.screeningFileSkipped}>
              <h3 className={styles.title}>
                Автоматический перенос «Скрининг»
              </h3>
              <button
                className={styles.closeModal}
                onClick={() => setAlertModalContent('')}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => setAlertModalContent('')}
              >
                Закрыть
              </button>
            </div>
          </>
        )}
        {alertModalContent === 'sendOfferFileAlert' && (
          <div>
            <div className={styles.screeningFileAlert}>
              <h3 className={styles.title}>Прикрепите файл «Оффера»</h3>
              <button
                onClick={() => setAlertModalContent('')}
                className={styles.closeModal}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <span>
              {' '}
              Обратите внимание, файл «Оффера» не был подкреплен. Вы сможете
              перевести резюме кандидата в следующий статус только после
              того, как подкрепите файл оффера.
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => {
                  setAlertModalContent('')
                  setOpenDocumentsModalScreening(true)
                }}
              >
                Подкрепить
              </button>
              <button
                className={styles.modalButtonWhite}
                onClick={() => setAlertModalContent('sendOfferFileSkipped')}
              >
                Пропустить
              </button>
            </div>
          </div>
        )}
        {alertModalContent === 'sendOfferFileSkipped' && (
          <div>
            <div className={styles.screeningFileAlert}>
              <h3 className={styles.title}>
                Статус не изменен на статус «Оффер»
              </h3>
              <button
                onClick={() => setAlertModalContent('')}
                className={styles.closeModal}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <span>
              Статус не был изменен, так как вы не подкрепили файл «Оффера»
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => setAlertModalContent('')}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
        {alertModalContent === 'sendOfferFileComplete' && (
          <div>
            <div className={styles.screeningFileAlert}>
              <h3 className={styles.title}>
                Автоматический перенос «Оффер»
              </h3>
              <button
                onClick={() => setAlertModalContent('')}
                className={styles.closeModal}
              >
                <Icon.CrossOption />
              </button>
            </div>
            <span>
              Добавлен файл оффера, резюме кандидата переведется в статус
              «Оффер»
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => setAlertModalContent('')}
              >
                Продолжить
              </button>
            </div>
          </div>
        )}
      </div>
    </AlertModal>)}
    {openDocumentsModalScreening && (
      <AddVacancyDocumentsModal
        chosenOption={chosenOption}
        candidate={candidate}
        fileComplete={fileComplete}
        fileFailed={() => setAlertModalContent('sendOfferFileSkipped')}
        active={openDocumentsModalScreening}
        setActive={setOpenDocumentsModalScreening}
        uploader={uploader}
      />
    )}
    </>
  )
}

export default FileAlertModal
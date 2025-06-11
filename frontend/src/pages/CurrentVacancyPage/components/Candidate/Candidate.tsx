import styles from './Candidate.module.css'
import { Link } from 'react-router-dom'
import { Icon, ResumeStatus } from '../../../../UI'
import dayjs from 'dayjs'
import { AddVacancyDocumentsModal } from '../AddVacancyDocumentsModal'
import { useState } from 'react'
import { Applicant } from '../../../../services/resumesApi/models'
import { applicantVacancyApi } from '../../../../services/applicant-vacancyApi/applicant-vacancyApi'
import { useAppDispatch } from '../../../../store'
import { setVacancyApplicantState } from '../../../../store/reducers/currentVacancyReducer'
import FileAlertModal from 'UI/Modal/Components/FileAlertModal'

interface IProps {
  candidate: Applicant
}

const filetypes = {
  ['screening']: 'SCREENING',
  ['sendOffer']: 'OFFER',
}

const Candidate = (props: IProps) => {
  const { candidate } = props
  const dispatch = useAppDispatch()
  const [alertModalContent, setAlertModalContent] = useState<
    | 'screeningFileAlert'
    | 'screeningFileComplete'
    | 'screeningFileSkipped'
    | 'sendOfferFileAlert'
    | 'sendOfferFileComplete'
    | 'sendOfferFileSkipped'
    | ''
  >('')
  const [openDocumentsModalScreening, setOpenDocumentsModalScreening] =
    useState(false)
  const [chosenOption, setChosenOption] = useState<'screening' | 'sendOffer'>(
    'screening'
  )

  const uploader = (file: any) => {
    return applicantVacancyApi.addDocumentById(
      candidate.relationshipId,
      filetypes[chosenOption],
      file
    )
  }

  const updater = (state: any) => {
    dispatch(setVacancyApplicantState({ id: candidate.id, status: state }))
  }

  const openAlertModalHandler = (string: 'sendOffer' | 'screening') => {
    setAlertModalContent(`${string}FileAlert`)
  }

  return (
    <>
      <div className={styles.candidate}>
        <Link
          to={`/applicant/${candidate.id}`}
          className={styles.candidateHeader}
        >
          <Icon.VacancyPageIcon />
          <span className={styles.candidateName}>
            {candidate.surname + ' ' + candidate.name}
          </span>
        </Link>
        <div className={styles.status}>
          <ResumeStatus
            setChosenOption={setChosenOption}
            openAlertModal={openAlertModalHandler}
            id={candidate.relationshipId}
            option={candidate.state}
            updater={updater}
          />
        </div>
        <span className={styles.timeCreateText}>
          Дата добавления:
          <span className={styles.timeCreate}>
            {dayjs(candidate.timeCreate).format('DD.MM.YYYY')}
          </span>
        </span>
      </div>
      {!!alertModalContent && (
        <FileAlertModal alertModalContent={alertModalContent} candidate={candidate} 
          chosenOption={chosenOption} onClose={() => setAlertModalContent('')} />
      )}
    </>
  )
}

export default Candidate

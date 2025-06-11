import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

import ResumeBoardColumn from '../ResumeBoardColumn'
import { ResumeStatus } from '../../../../types'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { loadMoreTaggedResumes } from '../../../../store/slices/resumeSlice'
import {
  addTaggedApplicantCard,
  changeApplicantCardTag,
  removePreviewApplicantId,
  setAlreadyLoadedCount,
  setHrAndCreateDate,
} from '../../../../store/reducers/taggedResumesReducer'
import style from './ResumeBoardGrid.module.css'
import { resumesApi } from '../../../../services/resumesApi/resumesApi'
import {
  Applicant,
  ApplicantGridCard,
} from '../../../../services/resumesApi/models'
import { ResumePreviewModal } from '../../../../UI/Modal/Components/ResumeBoardModals/ResumePreviewModal/ResumePreviewModal'
import { vacanciesApi } from 'services/vacanciesApi/vacanciesApi'
import FileAlertModal from 'UI/Modal/Components/FileAlertModal'

const ResumeBoardGrid = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [cardsInColumn, setCardsInColumn] = useState(2)
  const downloadStep = 2

  const resumeData = useAppSelector((state) => state.resumes.resumes)
  const dispatch = useAppDispatch()
  const {
    taggedNew,
    taggedCommunication,
    taggedScreening,
    taggedInterview,
    taggedCustomerInterview,
    taggedCheckSecurity,
    taggedSendOffer,
    previewApplicantGridCard,
    alreadyLoaded,
  } = useAppSelector((state) => state.taggedResumes)

  const [alertModalContent, setAlertModalContent] = useState<
    | 'screeningFileAlert'
    | 'screeningFileComplete'
    | 'screeningFileSkipped'
    | 'sendOfferFileAlert'
    | 'sendOfferFileComplete'
    | 'sendOfferFileSkipped'
    | ''
  >('')
  const [candidate, setCandidate] = useState<Applicant>()
  const [chosenOption, setChosenOption] = useState<'screening' | 'sendOffer'>(
    'screening'
  )
  const [currentCard, setCurrentCard] = useState()

  const needToDownloadColumn = (column: ApplicantGridCard[]) => {
    return (
      column.length < cardsInColumn + downloadStep &&
      cardsInColumn - column.length <= downloadStep
    )
  }

  const needToDownloadCardsCheck = () => {
    return (
      needToDownloadColumn(taggedNew) ||
      needToDownloadColumn(taggedCommunication) ||
      needToDownloadColumn(taggedScreening) ||
      needToDownloadColumn(taggedInterview) ||
      needToDownloadColumn(taggedCustomerInterview) ||
      needToDownloadColumn(taggedCheckSecurity) ||
      needToDownloadColumn(taggedSendOffer)
    )
  }

  const updateResumesWIthStatus = () => {
    if (!!resumeData.length) {
      for (let i = alreadyLoaded; i < resumeData.length; i++)
        if (resumeData[i].vacancies[0]?.state) {
          dispatch(addTaggedApplicantCard({ card: resumeData[i] }))

          resumesApi.getApplicant(resumeData[i].id).then((res: Applicant) => {
            dispatch(
              setHrAndCreateDate({
                card: resumeData[i],
                hr: res.responsibleHr,
                createDate: dayjs(res.timeCreate).format('D M YYYY'),
              })
            )
          })
        }
    }
    dispatch(setAlreadyLoadedCount({ count: resumeData.length }))
  }

  const closePreviewModal = () => {
    dispatch(removePreviewApplicantId())
    document.body.style.overflow = 'scroll'
    setIsPreviewModalOpen(false)
  }

  const downloadCardsIfNeed = (isIncrementHeightNecessary: boolean) => {
    if (needToDownloadCardsCheck()) {
      if (isIncrementHeightNecessary)
        setCardsInColumn((prevState) => prevState + downloadStep)
      dispatch(loadMoreTaggedResumes())
    }
  }

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      downloadCardsIfNeed(true)
    }
  }

  const handleSendOffer = () => {
    dispatch(
      changeApplicantCardTag({
        card: currentCard,
        newTag: 'sendOffer'
      })
    )
  }

  useEffect(() => {
    updateResumesWIthStatus()
  }, [resumeData])

  useEffect(() => {
    if (previewApplicantGridCard) {
      document.body.style.overflow = 'hidden'
      setIsPreviewModalOpen(true)
    }
  }, [previewApplicantGridCard])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  useEffect(() => {
    if (alreadyLoaded === 0) setCardsInColumn(downloadStep)
  }, [alreadyLoaded])

  return (
    <>
      <Grid container columns={7} spacing={1} className={style.contentGrid}>
        <DndContext
          onDragStart={() => {
            document.body.style.setProperty('cursor', 'grabbing')
          }}
          onDragEnd={(e: DragEndEvent) => {
            const currentResumeStatus = e.active?.data.current?.resumeStatus
            const newResumeStatus: string = e.over?.data.current?.resumeStatus
            setChosenOption(newResumeStatus)
            document.body.style.setProperty('cursor', '')
            if (currentResumeStatus === newResumeStatus) {
              return
            }
            if (newResumeStatus != 'sendOffer') {
              dispatch(
                changeApplicantCardTag({
                  card: e.active.data.current?.applicantCard,
                  newTag: newResumeStatus === ResumeStatus.SendOffer && false?
                  currentResumeStatus : newResumeStatus,
                })
              )
              downloadCardsIfNeed(false)
            }

            if (newResumeStatus === 'screening' || newResumeStatus === 'sendOffer') {
              setAlertModalContent(`${newResumeStatus}FileAlert`)

              const applicant = e.active?.data.current?.applicantCard.applicant
              const applicantId = applicant.id
              const vacancyId = applicant.vacancies
                [e.active?.data.current?.applicantCard.vacancyNumber].id
              
              const vacancy = vacanciesApi.getVacanciesById(vacancyId)
              vacancy.then(res => {
                  setCandidate(res.applicants.find(obj => obj.id === applicantId))
                }
              )
              if (newResumeStatus === 'sendOffer') {
                setCurrentCard(e.active.data.current?.applicantCard)
              }
            } else {
              setAlertModalContent('')
              setCandidate(undefined)
            }
          }}
        >
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.New}
            applicants={taggedNew}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.Communication}
            applicants={taggedCommunication}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.Screening}
            applicants={taggedScreening}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
          {/* <ResumeBoardColumn
            resumeStatus={ResumeStatus.Interview}
            applicants={taggedInterview}
            cardsInColumn={cardsInColumn}
          /> */}
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.CustomerInterview}
            applicants={taggedCustomerInterview}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.CheckSecurity}
            applicants={taggedCheckSecurity}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
          <ResumeBoardColumn
            resumeStatus={ResumeStatus.SendOffer}
            applicants={taggedSendOffer}
            cardsInColumn={cardsInColumn}
          />
          <div className={style.divider}></div>
        </DndContext>
      </Grid>
      <ResumePreviewModal
        isOpen={isPreviewModalOpen}
        closeModal={closePreviewModal}
        applicantId={previewApplicantGridCard?.applicant.id}
      />
      {alertModalContent && (
        <>
        <FileAlertModal alertModalContent={alertModalContent} candidate={candidate}
          chosenOption={chosenOption} onClose={() => setAlertModalContent('')} 
          onFileComplete={handleSendOffer} />
        </>
      )}
    </>
  )
}

export default ResumeBoardGrid

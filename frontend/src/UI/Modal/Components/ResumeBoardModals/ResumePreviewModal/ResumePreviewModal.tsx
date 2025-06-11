import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'

import style from './ResumePreviewModal.module.css'
import Calendar from '../../../../Icon/Components/Calendar'
import { Applicant } from '../../../../../services/resumesApi/models'
import { resumesApi } from '../../../../../services/resumesApi/resumesApi'
import Vacancies from '../../../../../pages/ProfileApplicant/components/personalData/components/Vacancies'
import { vacanciesApi } from '../../../../../services/vacanciesApi/vacanciesApi'
import { setPreviewApplicantStatus } from '../../../../../store/reducers/taggedResumesReducer'
import { ResumeStatus } from '../../../../../types'
import { ChangeResponsibleHrField } from './Components/ChangeResponsibleHrField/ChangeResponsibleHrField'
import { Icon } from 'UI'
import { userApi } from '../../../../../services/userApi/userApi'
import { setProfileEmailHR } from '../../../../../store/slices/taskSlice'
import { getYearWithYearsName } from '../../../../../utils/getYearWithYearsName'

interface IProps {
  applicantId: string
  isOpen: boolean
  closeModal: () => void
}

export const ResumePreviewModal = ({
  applicantId,
  isOpen,
  closeModal,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [applicant, setApplicant] = useState<Applicant>()
  const [dateOfOpenOfVacancy, setDateOfOpenOfVacancy] = useState('')
  const dispatch = useDispatch()

  const hireButtonClickHandler = () => {
    dispatch(setPreviewApplicantStatus({ newTag: ResumeStatus.Exit }))
    closeModal()
  }

  const rejectButtonClickHandler = () => {
    dispatch(setPreviewApplicantStatus({ newTag: ResumeStatus.Reject }))
    closeModal()
  }

  const updateApplicant = () => {
    resumesApi.getApplicant(applicantId).then((res) => {
      setApplicant(res)
      vacanciesApi.getVacanciesById(res.vacancies[0].id).then((vac) => {
        setDateOfOpenOfVacancy(dayjs(vac.timeCreate).format('DD.MM.YYYY') || '')
        setIsLoading(false)
      })
    })
  }

  const onResponsibleHrChangeHandler = () => {
    updateApplicant()
  }

  useEffect(() => {
    if (isOpen) updateApplicant()
    else setIsLoading(true)
  }, [isOpen])

  useEffect(() => {
    userApi.getHRs().then((res) => {
      dispatch(setProfileEmailHR(res))
    })

    return () => {document.body.style.overflow = 'scroll'}
  }, [])

  const conditionalRender = () => {
    if (isOpen && !isLoading)
      return createPortal(
        <div className={style.modalContent} onMouseDown={closeModal}>
          <div
            className={style.board}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={style.mainLabel}>
              {applicant?.name +
                ' ' +
                applicant?.surname +
                ' ' +
                (applicant?.patronym || '')}
            </div>

            <div className={style.divider}></div>
            <div className={style.infoBlock}>
              <div className={style.mainLabel}>
                {applicant?.vacancies[0].position?.positionName}
              </div>
              <div className={style.smallLabel}>
                Пол: {applicant?.gender === 'male' ? 'Мужской' : 'Женский'}
              </div>
              <div className={style.mainLabel}>
                <div className={style.smallLabel}>
                  <Calendar strokeColor='white' /> Дата рождения:{' '}
                  {dayjs(applicant?.dateBirth).format('DD.MM.YYYY')}
                  {getYearWithYearsName(
                    dayjs().diff(dayjs(applicant?.dateBirth), 'years')
                  )}
                </div>
              </div>
            </div>
            <div className={style.divider}></div>
            <div className={style.infoBlock}>
              <div className={style.smallLabel}>
                Должность: {applicant?.vacancies[0]?.position?.positionName}
              </div>
              {/*еще не сформировано в БД*/}
              <div className={style.smallLabel}>Категория: middle</div>
              <div className={style.smallLabel}>
                Ожидаемая ЗП: {applicant?.salary?.toString() + ' '}
                {applicant?.currency?.toString()}
              </div>
            </div>

            <div className={style.divider}></div>
            <Vacancies vacancies={applicant?.vacancies || []} />

            <div className={style.buttonsBlock}>
              <button
                className={style.hireButton}
                onClick={hireButtonClickHandler}
              >
                Нанят
              </button>
              <button
                className={style.rejectButton}
                onClick={rejectButtonClickHandler}
              >
                Отказ
              </button>
            </div>

            <div className={style.divider} />
            <div className={style.infoBlock}>
              <div className={style.smallLabel}>
                <Calendar strokeColor='white' /> Дата открытия вакансии:{' '}
                {dateOfOpenOfVacancy}
              </div>
              <ChangeResponsibleHrField
                responsibleHr={applicant?.responsibleHr || null}
                applicantID={applicantId}
                onChange={onResponsibleHrChangeHandler}
              />
              <div className={style.smallLabel}>
                <Icon.WhiteUserDefault />
                {/*проблемы с получением данных с сервера*/}
                Оригинал резюме: www.google.com
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
  }

  return <>{conditionalRender()} </>
}

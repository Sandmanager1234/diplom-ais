import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from '@dnd-kit/core'

import styles from './ResumeBoardCard.module.css'
import { ApplicantGridCard } from '../../../../services/resumesApi/models'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { ResumeStatus } from '../../../../types'
import { setPreviewApplicantId } from '../../../../store/reducers/taggedResumesReducer'
import { Icon } from '../../../../UI'
import { Link } from 'react-router-dom'

interface IProps {
  applicantCard: ApplicantGridCard
  resumeStatus: ResumeStatus
}

const ResumeBoardCard = ({ applicantCard, resumeStatus }: IProps) => {
  const loadingCards = useAppSelector(
    (state) => state.taggedResumes.cardsToDownload
  )
  const [alreadyLoaded, setAlreadyLoaded] = useState(false)
  const dispatch = useAppDispatch()
  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: applicantCard.applicant.id + applicantCard.vacancyNumber.toString(),
    data: {
      resumeStatus: resumeStatus,
      applicantCard: applicantCard,
      index: applicantCard.applicant.id,
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(setPreviewApplicantId({ applicantGridCard: applicantCard }))
  }

  useEffect(() => {
    if (!loadingCards) setAlreadyLoaded(true)
  }, [loadingCards])

  const conditionalRender = () => {
    if (loadingCards > 0 && !alreadyLoaded) {
      return <Skeleton width='100%' height='100%' />
    } else {
      return (
        <div className={styles.contentWrapper}>
          <Link to={`/applicant/${applicantCard.applicant.id}`} className={styles.nameSpan}>
            {applicantCard.applicant.surname +
              ' ' +
              applicantCard.applicant.name}
          </Link>
          <div className={styles.spanBlock}>
            <div className={styles.graySpan}>ответственный</div>
            <div className={styles.blackSpan}>
              {applicantCard.responsibleHR?.fio || 'Нет'}
            </div>
          </div>
          <div className={styles.spanBlock}>
            <div className={styles.graySpan}>Вакансия</div>
            <div className={styles.blackSpan}>
              {
                applicantCard.applicant.vacancies[applicantCard.vacancyNumber]
                  ?.position?.positionName
              }
            </div>
          </div>
          <div className={styles.lowerBlock}>
            <Icon.CalendarWithSquare />
            <span className={styles.graySpan}>
              {dayjs(applicantCard.createData, 'D M YYYY').format(
                'DD.MM.YYYY'
              ) || dayjs().format('DD.MM.YYYY')}
            </span>
          </div>
        </div>
      )
    }
  }

  return (
    <Grid
      item
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      alignContent='center'
    >
      <div className={styles.card} onContextMenu={handleClick}>
        {conditionalRender()}
      </div>
    </Grid>
  )
}

export default ResumeBoardCard

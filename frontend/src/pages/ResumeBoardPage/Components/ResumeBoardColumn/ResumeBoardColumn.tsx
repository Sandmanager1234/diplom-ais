import { Grid } from '@mui/material'
import { CSSProperties } from 'react'
import { useDroppable } from '@dnd-kit/core'

import { ResumeStatus } from '../../../../types'
import ResumeBoardCard from '../ResumeBoardCard'
import {
  MAP_OPTION_TO_RESUME_STATUS,
  MAP_STATUS_TO_RESUME_COLOR,
} from '../../../../data/personalDataConstants'
import style from './ResumeBoardColumn.module.css'
import { ApplicantGridCard } from '../../../../services/resumesApi/models'

interface IProps {
  resumeStatus: ResumeStatus
  applicants: ApplicantGridCard[]
  cardsInColumn: number
}

const ResumeBoardColumn = ({
  resumeStatus,
  applicants,
  cardsInColumn,
}: IProps) => {
  const getCards = () => {
    const cards: JSX.Element[] = []
    for (let i = 0; i < Math.min(cardsInColumn, applicants.length); i++) {
      cards.push(
        <ResumeBoardCard
          applicantCard={applicants[i]}
          key={
            applicants[i].applicant.id + applicants[i].vacancyNumber.toString()
          }
          resumeStatus={resumeStatus}
        />
      )
    }
    return cards
  }

  const { setNodeRef } = useDroppable({
    id: resumeStatus,
    data: {
      resumeStatus: resumeStatus,
    },
  })

  return (
    <Grid item xs={1} ref={setNodeRef}>
      <Grid
        container
        spacing={1}
        direction='column'
        alignContent='start'
        className={style.mainGrid}
        style={
          {
            '--borderColor': MAP_STATUS_TO_RESUME_COLOR[resumeStatus],
          } as CSSProperties
        }
      >
        <Grid item width='100%' className={style.nameGrid}>
          <label>{MAP_OPTION_TO_RESUME_STATUS[resumeStatus]}</label>
        </Grid>
        <Grid item container direction='column' alignContent='start'>
          <div className={style.column}>{getCards()}</div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ResumeBoardColumn

import dayjs from 'dayjs'

import { ResponsibleHr } from 'types/vacancies'

import { Icon } from 'UI'
import Responsible from './components/Responsible'

import styles from './AboutResume.module.css'

type Props = {
  responsibleHr: ResponsibleHr | null
  createDate: string
  applicantID: string
}

export const AboutResume = (props: Props) => {
  const { responsibleHr, createDate, applicantID } = props

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.createdAt}>
        <Icon.Calendar />
        Добавлено: {dayjs(createDate).format('DD.MM.YYYY')}
      </div>
      <Responsible responsibleHr={responsibleHr} applicantID={applicantID} />
    </div>
  )
}

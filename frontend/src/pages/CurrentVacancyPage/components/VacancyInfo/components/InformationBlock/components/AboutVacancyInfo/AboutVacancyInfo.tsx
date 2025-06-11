import { FC } from 'react'
import dayjs from 'dayjs'

import { Icon } from 'UI'

import { type ResponsibleHr } from 'types/vacancies'

import Responsible from './components/Responsible'

import style from './AboutVacancyInfo.module.css'

export type AboutVacancyInfoProps = {
  responsibleHr: ResponsibleHr
  createAt: string
  vacancyID: string
}

const AboutVacancyInfo: FC<AboutVacancyInfoProps> = ({
  responsibleHr,
  createAt,
  vacancyID,
}) => {
  return (
    <div className={style.aboutContainer}>
      <div className={style.createdAt}>
        <Icon.Calendar />
        Дата открытия вакансии: {dayjs(createAt).format('DD.MM.YYYY')}
      </div>
      <Responsible responsibleHr={responsibleHr} vacancyID={vacancyID} />
    </div>
  )
}

export default AboutVacancyInfo

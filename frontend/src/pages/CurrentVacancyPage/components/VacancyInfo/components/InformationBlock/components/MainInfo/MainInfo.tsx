import { FC } from 'react'

import { VacancyStatus } from 'UI'
import { VacancyStatus as VacancyStatusType } from 'types/vacancies'

import style from './MainInfo.module.css'

export type MainInfoProps = {
  vacancyTitle: string
  grade: string
  salary: string
  currency: string
  vacancyID: string
  option: VacancyStatusType
}

const MainInfo: FC<MainInfoProps> = ({
  vacancyTitle,
  grade,
  salary,
  currency,
  vacancyID,
  option,
}) => {
  return (
    <>
      <span className={style.vacancyTitle}>{vacancyTitle}</span>
      <span className={style.grade}>{grade}</span>
      <span className={style.salary}>
        {salary} {currency ? currency : <span>&#x20bd;</span>}
      </span>
      <VacancyStatus id={vacancyID} option={option} />
    </>
  )
}

export default MainInfo

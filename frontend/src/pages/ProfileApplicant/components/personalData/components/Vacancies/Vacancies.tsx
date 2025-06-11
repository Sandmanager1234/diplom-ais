import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon, VacancyStatus } from 'UI'

import { Vacancies as VacanciesType } from 'services/resumesApi/models'

import styles from './Vacancies.module.css'
import { vacanciesApi } from 'services/vacanciesApi/vacanciesApi'
import { VacancyStatus as VacancyStatusType } from 'types/vacancies'


type Props = {
  vacancies: VacanciesType
}

const Vacancies: FC<Props> = (props) => {
  const { vacancies } = props
  const [vacancyStatusList, setVacancyStatusList] = useState<VacancyStatusType[]>([])

  useEffect(() => {
    const getVacancesStatuses = () => {
      const vacanciesStatusesPromises = vacancies.map(item => 
        vacanciesApi.getVacanciesById(item.id)
        .then(response => response.status)
      )
      return Promise.all(vacanciesStatusesPromises)
    } 
    getVacancesStatuses().then(statuses => setVacancyStatusList(statuses))
  }, [vacancies])

  return (
    <div className={styles.vacanciesContainer}>
      <div className={styles.vacanciesWrapper}>
        <h3 className={styles.vacanciesHeader}>Вакансии</h3>
        <button>
          <Icon.PlusMini />
        </button>
      </div>
      <div className={styles.vacanciesList}>
        {vacancies.map((item, index) => (
          <div className={styles.vacancy} key={index}>
            <Link to={`/vacancies/${item.id}`} className={styles.vacancyHeader}>
              <Icon.VacancyPageIcon />
              <p>{item.position.positionName}</p>
            </Link>
            <div className={styles.status}>
              <VacancyStatus id={item.id} option={vacancyStatusList[index]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vacancies

import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox } from '@mui/material'

import { Card, Icon, VacancyStatus } from 'UI'

import { Vacancy } from 'types/vacancies'
import { getLocationFormat } from 'utils/getLocationFormat'
import { favouriteApi } from 'services/favouriteApi/favouriteApi'

import styles from './VacancyCard.module.css'
import EditVacancyList from 'UI/VacancyStatus/components/EditVacancyList'

type Props = {
  vacancy: Vacancy
}

const VacancyCard: FC<Props> = (props) => {
  const { vacancy } = props
  const [favourite, setFavourite] = useState(vacancy.favourite)

  const onClick = () =>
    favouriteApi
      .editFavoriteVacancy(vacancy.id, !favourite)
      .then(() => setFavourite((prev) => !prev))

  return (
    <Card>
      <div className={styles.vacancyBlock}>
        <div className={styles.vacancyNameBlock}>
          <Link to={`/vacancies/${vacancy.id}`} className={styles.vacancyName}>
            {vacancy.name}
          </Link>
        </div>
        <div className={styles.vacancyInfo}>
          <div className={styles.vacancyPosition}>
            <Link to={`/vacancies/${vacancy.id}`} className={styles.position}>
              {vacancy.position}
            </Link>
            <span className={styles.employment}>{vacancy.employment_type}, {vacancy.format_of_work}, {vacancy.schedule_type}</span>
            {/* <span className={styles.customer}>{vacancy.customer}</span> */}
            <span className={styles.candidateCount}>Количество кандидатов: 5</span>
          </div>
          <div className={styles.searchLocation}>
            <span className={styles.location}>{vacancy.branch}</span>
            {vacancy.locations.map((item, index) => (
              <span key={index} className={styles.location}>
                {getLocationFormat(item)}
              </span>
            ))}
          </div>
          <div className={styles.grade}>
            {vacancy.grades.map((item, index) => (
              <span key={index} className={styles.gradeText}>
                {item.grade}
              </span>
            ))}
          </div>
          <div className={styles.status}>
            <VacancyStatus id={vacancy.id} option={vacancy.status} />
          </div>
          <div className={styles.iconBlock}>
            <Checkbox
              className={styles.checkbox}
              classes={styles}
              icon={<Icon.Bookmark />}
              checkedIcon={<Icon.BookmarkChecked />}
              checked={favourite}
              onClick={onClick}
            />
            <EditVacancyList />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default VacancyCard

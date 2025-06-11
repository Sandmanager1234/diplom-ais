import { Header, VacanciesList } from './components'

import styles from './VacanciesPage.module.css'

const VacanciesPage = () => {
  return (
    <div className={styles.vacanciesPage}>
      <Header />
      <VacanciesList />
    </div>
  )
}

export default VacanciesPage

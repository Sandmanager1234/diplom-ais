import { useEffect } from 'react'
import { Icon, Tabs } from 'UI'

import { useAppDispatch, useAppSelector } from 'store'
import {
  Condition,
  conditions,
} from 'pages/Resumes/components/SearchBar/constants/conditions'
import {
  setCurrentPage,
  setTabRequestsCondition,
  setTotalCount,
  loadMoreVacancies,
} from 'store/slices/vacanciesSlice'
import { LoadingStatus } from 'store/data/models'
import { SearchVacancies, SortingVacancies } from './components'
import styles from './Header.module.css'

const Header = () => {
  const dispatch = useAppDispatch()
  const { tabRequests, loadingStatus, activeTab } = useAppSelector(
    (state) => state.vacancies
  )

  useEffect(() => {
    dispatch(setCurrentPage(0))
    dispatch(setTotalCount(1))
  }, [dispatch])

  useEffect(() => {
    dispatch(loadMoreVacancies())
  }, [tabRequests])

  const onChangeTabs = (newValue: Condition) => {
    dispatch(setTabRequestsCondition(newValue))
  }

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <span className={styles.pageName}>Вакансии</span>
        <button className={styles.createVacancy}>
          <Icon.AddVacancy /> Создать вакансию
        </button>
      </div>
      <div className={styles.tabs}>
        <Tabs
          tabsCondition={activeTab}
          handleChange={onChangeTabs}
          items={conditions}
          disabled={loadingStatus === LoadingStatus.PENDING}
        />
      </div>
      <SearchVacancies />
      <SortingVacancies />
    </div>
  )
}

export default Header

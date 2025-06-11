import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { Icon, LoaderDots } from 'UI'

import { LoadingStatus } from 'store/data/models'
import {
  loadMoreVacancies,
  setTabRequestsCondition,
} from 'store/slices/vacanciesSlice'
import {
  selectLoadingStatus,
  selectVacancies,
} from 'store/selectors/vacanciesSelector'
import { useScrollVisibility } from 'hooks/useScrollVisibility'
import { getSortedCards } from 'utils/getSortedCards'
import { Vacancy } from 'types/vacancies'
import VacancyCard from '../VacancyCard'
import SortCardsCheckbox from 'UI/SortCardsCheckbox'
import styles from './VacanciesList.module.css'
import { Condition } from '../../../Resumes/components/SearchBar/constants/conditions'
import { api } from 'services/apiEndpoints'
import { useSearchParams } from 'react-router-dom'


const VacanciesList = () => {
  const sortField = 'a'

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('');
  ['branches', 'grades', 'employment_type', 'schedule_type', 'format_of_work', 'job_title']
  .map(value => {
    if (searchParams.has(value)) {
      setFilterType(value)
      setFilterValue(searchParams.get(value) ?? '')
    }
  })
  const sortValue = searchParams.get('sort') ?? ''

  const vacanciesData = useAppSelector(selectVacancies)
  // const [vacanciesData, setVacanciesData] = useState([])
  // useEffect(() => {
  //   const getValues = async () => {
  //     const response = await api.getVacancies()
  //     const vacanciesList = response.data
  //     .filter(query ? 
  //       vacancy => vacancy.title.toLowerText().includes(query.toLowerCase()) ||
  //       vacancy.description.toLowerText().includes(query.toLowerCase()) : true
  //     )
  //     .filter(filterType ? 
  //       vacancy => vacancy[filterType].toLowerText().includes(filterValue.toLowerCase()) : true
  //     )
  //     .sort((a, b) => sortValue === 'none' ? 0 : a[sortValue].localeCompare(b[sortValue]))
  //     setVacanciesData(vacanciesList)
  //   }
  //   getValues()
  // }, [])
  const loadingStatus = useAppSelector(selectLoadingStatus)
  const dispatch = useAppDispatch()

  console.log(vacanciesData)

  const [showBtn, setShowBtn] = useState(false)
  const [isSortedByDateAddedAsc, setIsSortedByDateDesc] = useState(true)

  useEffect(() => useScrollVisibility(setShowBtn), [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(loadMoreVacancies())
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  useEffect(() => {
    dispatch(setTabRequestsCondition(Condition.ALL))
  }, [dispatch])

  if (vacanciesData.length === 0 && loadingStatus === LoadingStatus.PENDING) {
    return (
      <div>
        <LoaderDots />
      </div>
    )
  }

  const sortedVacanciesData = getSortedCards<Vacancy>(
    vacanciesData,
    isSortedByDateAddedAsc
  )

  return (
    <div className={styles.vacanciesList}>
      <SortCardsCheckbox
        checked={isSortedByDateAddedAsc}
        setChecked={setIsSortedByDateDesc}
      />
      {sortedVacanciesData.map((vacancy, index) => (
        <VacancyCard key={index} vacancy={vacancy} />
      ))}
      {loadingStatus === LoadingStatus.PENDING && (
        <div className={styles.loader}>
          <LoaderDots />
        </div>
      )}
      {showBtn && (
        <button className={styles.btnContentUp} onClick={scrollTop}>
          <Icon.ContentUp />
        </button>
      )}
    </div>
  )
}

export default VacanciesList

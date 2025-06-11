import { useEffect, useState } from 'react'

import { Icon, Select } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { setResumes } from '../../../../store/slices/resumeSlice'
import { removeEmptyValues } from '../../../../utils/removeEmptyValues'
import { resumesApi } from '../../../../services/resumesApi/resumesApi'

import styles from './Sorting.module.css'

export const Sorting = (props) => {
  const { isActive, setActive } = props

  const { sorting } = useAppSelector((state) => state.resumes)
  const { filteringFields } = useAppSelector((state) => state.filterResume)
  const dispatch = useAppDispatch()

  const filterParams = Object.entries(removeEmptyValues({ ...filteringFields }))
    .map((item) => `&${item[0]}=${item[1]}`)
    .join('')
  const descOrAsc = Object.entries(removeEmptyValues({ ...sorting }))
    .map((item) => `sort=${item[0]},${item[1]}&`)
    .join('')

  const [sortingShow, setSortingShow] = useState({ sortType: '', isActive: -1 })

  const sortName = (result: number) => {
    if (Object.values(sorting)[result].includes('asc')) {
      return (
        <div className={styles.imageActive}>
          <Icon.SortAscending />
        </div>
      )
    } else if (Object.values(sorting)[result].includes('desc')) {
      return (
        <div className={styles.imageActive}>
          <Icon.SortDescending />
        </div>
      )
    } else {
      return <Icon.SortBy />
    }
  }

  const name = [
    { id: 0, title: 'По умолчанию', image: <Icon.SortBy /> },
    { id: 1, title: 'Сортировка от А до Я', image: <Icon.SortAscending /> },
    { id: 2, title: 'Сортировка от Я до А', image: <Icon.SortDescending /> },
  ]

  const experiences = [
    { id: 0, title: 'Стаж по умолчанию', image: <Icon.SortBy /> },
    { id: 1, title: 'Стаж по возрастанию', image: <Icon.SortAscending /> },
    { id: 2, title: 'Стаж по убыванию', image: <Icon.SortDescending /> },
  ]

  const salary = [
    { id: 0, title: 'По умолчанию', image: <Icon.SortBy /> },
    { id: 1, title: 'По возрастанию', image: <Icon.SortAscending /> },
    { id: 2, title: 'По убыванию', image: <Icon.SortDescending /> },
  ]

  const sortingList = [
    { id: 0, name: 'name', title: 'Имя', image: <Icon.SortBy />, sortType: name },
    {
      id: 1,
      name: 'summaryExperience',
      title: 'Должность и стаж',
      image: <Icon.SortBy />,
      sortType: experiences,
    },
    { id: 999, name: 'contacts', title: 'Контакты', image: '', sortType: [] },
    {
      id: 2,
      name: 'salary',
      title: 'Желаемая ЗП',
      image: <Icon.SortBy />,
      sortType: salary,
    },
    { id: 999, name: 'sortStatus', title: 'Статус', image: '', sortType: [] },
  ]

  useEffect(() => {
    !isActive &&
      setSortingShow({ sortType: sortingShow.sortType, isActive: -1 })
  }, [isActive, sortingShow.sortType])

  useEffect(() => {
    resumesApi.getApplicants(`page=0&size=10${filterParams}&${descOrAsc}`).then(({data}) => {
      dispatch(setResumes(data.content))
    })
  }, [sorting])

  return (
    <div className={styles.wrap}>
      <div className={styles.sortingList}>
        {sortingList.map((sortingItem, index) => (
          <div key={index} className={styles.sortingItem}>
            {sortingItem.title}
            <button
              onClick={() => {
                setSortingShow({
                  sortType: sortingShow.sortType,
                  isActive:
                    sortingShow.isActive === sortingItem.id
                      ? -1
                      : sortingItem.id,
                })
                setActive(true)
              }}
            >
              {Object.keys(sorting).includes(sortingItem.name) &&
                sortName(sortingItem.id)}
            </button>
            <Select
              id={sortingItem.id}
              name={sortingItem.name}
              titleSort={sortingItem.title}
              options={sortingItem.sortType}
              state={sortingShow}
              setState={setSortingShow}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

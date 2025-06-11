import styles from './SearchVacancies.module.css'
import { Icon } from '../../../../../../UI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'services/apiEndpoints'

const SearchVacancies = () => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('none')
  const [filterItems, setFilterItems] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('none')

  useEffect(() => {
    if (filterType !== 'none')
      api.getFilter(filterType).then(response => {
        const items = response.data[filterType]
        setFilterItems(items)
      })
  }, [filterType])

  const search = () => {
    const filterString = filterType !== 'none' ?
      `&${filterType}=${filterValue}` : ''
    const sortString = sortValue !== 'none' ?
      `&sort=${sortValue}` : ''
    navigate(`/vacancies?q=${searchQuery}${filterString}${sortString}`)
  }

  return (
    <div className={styles.searchBlock}>
      <div>
        <input className={styles.searchInput} placeholder={'Поиск'} onChange={e => setSearchQuery(e.target.value)} />
        <button className={styles.cleaning}>
          <Icon.Close />
        </button>
      </div>
      <div>
        <p>Фильтры:</p>
        <form>
          <select name="filters" id="filters" onChange={e => setFilterType(e.target.value)}>
            <option value="none">Нет</option>
            <option value="branches">Филиал</option>
            <option value="grades">Грейд</option>
            <option value="employment_type">Тип занятости</option>
            <option value="schedule_type">График работы</option>
            <option value="format_of_work">Формат работы</option>
            <option value="job_title">Должность</option>
          </select>
          {filterType !== 'none' &&
          <select onChange={e => setFilterValue(e.target.value)}>
            {
              filterItems.map((item, index) => {
                const value = Object.values(item)[0]
                return (<option key={index} value={JSON.stringify(item)}>
          {value}</option>)
            })}
          </select>}
        </form>
      </div>
      <div>
        <p>Сортировка</p>
        <select name="sort" id="sort" onChange={e => setSortValue(e.target.value)}>
          <option value="none">Нет</option>
          <option value="title">Название</option>
          <option value="created_at">Дата создания</option>
          <option value="updated_at">Дата изменения</option>
        </select>
      </div>
      <button className={styles.searchButton} onClick={search}>Найти</button>
    </div>
  )
}

export default SearchVacancies

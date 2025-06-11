import {  useNavigate } from 'react-router-dom'

import { Icon } from 'UI'

import { useAppSelector } from 'store'

import { selectCurrentVacancy } from 'store/selectors/currentVacancySelector'

import style from './Header.module.css'

const Header = () => {
  const vacancy = useAppSelector(selectCurrentVacancy)

  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <header className={style.header}>
      <div>
        <button className={style.btn} onClick={goBack}>
          Вакансии
          <Icon.ArrowChewronRight />
        </button>
        {vacancy && <span>{vacancy.position}</span>}
      </div>
    </header>
  )
}

export default Header

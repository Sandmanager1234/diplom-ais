import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from 'UI'

import styles from './Header.module.css'

interface IHeaderProfile {
  currentPageName: string
}

export const Header: React.FC<IHeaderProfile> = (props) => {
  const { currentPageName } = props

  const navigate = useNavigate()

  return (
    <div className={styles.wrap}>
      <div className={styles.navigation}>
        <NavLink className={styles.link} to={'/'}>
          Главная
        </NavLink>{' '}
        <Icon.ArrowChewronRight />
        <div className={styles.subLink}>{currentPageName}</div>
      </div>
      <button
        onClick={() => {
          if (confirm('Вы точно хотите выйти из системы?')) {
            sessionStorage.removeItem('accessToken')
            navigate('/login')
          }
        }}
        className={styles.exit}
      >
        <Icon.ArrowLogIn />
        Выйти из системы
      </button>
    </div>
  )
}

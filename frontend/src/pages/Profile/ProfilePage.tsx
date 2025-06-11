import React from 'react'
import { Header } from './components/Header'
import { PersonalData } from './components/PersonalData'
import { ProfessionalData } from './components/ProfessionalData'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Header currentPageName={'Профиль'} />
        <div className={styles.page}>
          <PersonalData />
          <ProfessionalData />
        </div>
      </div>
    </>
  )
}

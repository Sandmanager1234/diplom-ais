import { FC } from 'react'
import { Header } from '../Profile/components/Header'
import { PersonalData } from '../Profile/components/PersonalData'
import { NotificationData } from './components/NotificationData'
import styles from './NotificationPage.module.css'

export const NotificationPage: FC = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Header currentPageName={'Уведомления'} />
        <div className={styles.page}>
          <PersonalData />
          <NotificationData />
        </div>
      </div>
    </>
  )
}

import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'

import { useAppSelector } from 'store'

import { NavLink } from '../../data/navigationLinkList'

import styles from './NavigationLink.module.css'
import {getActiveMenu} from "../../../../../../utils/getActiveMenu";

type Props = {
  navigationLinkData: NavLink
}

const NavigationLink: FC<Props> = (props) => {
  const { activeMenu } = useAppSelector((state) => state.resumes)
  const { countOfUnreadNotification } = useAppSelector(
    (state) => state.meetings
  )

  const location = useLocation()

  const { navigationLinkData } = props

  const navigationLink = cn({
    [styles.navigationLinkOpen]: activeMenu,
    [styles.navigationLinkClose]: !activeMenu,
    [styles.navigationLinkOpenActive]: getActiveMenu(location.pathname, navigationLinkData.src)
  })

  const titleNavLink = cn(
    activeMenu ? styles.titleNavLink : styles.titleNavLinkHidden
  )

  const showUnreadNotificationCount =
    navigationLinkData.title === 'Уведомления' && !!countOfUnreadNotification

  return (
    <Link className={navigationLink} to={navigationLinkData.src}>
      <div className={styles.navigationBlock}>
        {showUnreadNotificationCount && (
          <div className={styles.unreadNotification}>
            {countOfUnreadNotification}
          </div>
        )}
        {navigationLinkData.img}
        <div className={titleNavLink}>{navigationLinkData.title}</div>
      </div>
    </Link>
  )
}

export default NavigationLink

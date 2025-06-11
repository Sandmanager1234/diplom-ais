import cn from 'classnames'

import { useAppSelector } from 'store'

import { getNavigationLinkList } from './data/navigationLinkList'
import NavigationLink from "./Components/NavigationLink";

import styles from './LinksList.module.css'

const LinksList = () => {

  const { countOfUnreadNotification } = useAppSelector(
    (state) => state.meetings
  )

  const { activeMenu } = useAppSelector((state) => state.resumes)

  const navigationLinkList = getNavigationLinkList(countOfUnreadNotification)

  const navigationLinkStyle=cn(activeMenu ? styles.navigationLinkList : styles.navigationLinkListClose)

  return (
    <div className={navigationLinkStyle}>
      {navigationLinkList.map((navigationLinkData) => <NavigationLink key={navigationLinkData.id} navigationLinkData={navigationLinkData} />)}
    </div>
  )
}

export default LinksList

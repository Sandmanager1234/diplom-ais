import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Icon } from 'UI'

import { useAppDispatch, useAppSelector } from 'store'
import { setActiveMenu } from 'store/slices/resumeSlice'

import LogoLink from './Components/LogoLink'
import LinksList from './Components/LinksList'

import styles from './SideBar.module.css'



export const SideBar = () => {
  const dispatch = useAppDispatch()
  const { activeMenu } = useAppSelector((state) => state.resumes)

  const navigate = useNavigate()

  const click = () => {
    dispatch(setActiveMenu(!activeMenu))
  }

  const logOut = () => {
    if (confirm('Вы точно хотите выйти из системы?')) {
      sessionStorage.removeItem('accessToken')
      navigate('/login')
    }
  }

  const logOutStyle = cn(activeMenu ? styles.logOut : styles.logOutClose)

  const logOutTitleStyle = cn(
    activeMenu ? styles.logOutTitle : styles.logOutTitleClose
  )

  return (
    <div className={activeMenu ? styles.openSidebar : styles.closeSidebar}>
      <div className={styles.children}>
        <LogoLink />
        <LinksList />
        <button className={logOutStyle} onClick={logOut}>
          <Icon.ArrowLogOut />
          <span className={logOutTitleStyle}>Выход</span>
        </button>
        <button
          className={
            activeMenu ? styles.buttonHideMenuOpen : styles.buttonHideMenuClose
          }
          onClick={click}
        >
          <Icon.ArrowRight />
        </button>
      </div>
    </div>
  )
}

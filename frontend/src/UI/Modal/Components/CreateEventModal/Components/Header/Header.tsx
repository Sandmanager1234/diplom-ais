import { useEffect } from 'react'

import { fetchUser } from 'store/reducers/userReducer'
import { LoadingStatus } from 'store/data/models'
import { selectLoadingSatus, selectUser } from 'store/selectors/userSelector'

import { useAppDispatch, useAppSelector } from 'store'

import { getInitials } from 'utils/getInitials'

import { Skeleton } from './Components'

import style from './Header.module.css'

const Header = () => {
  const user = useAppSelector(selectUser)
  const loadingStatus = useAppSelector(selectLoadingSatus)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <header className={style.header}>
      {loadingStatus === LoadingStatus.FULFILLED ? (
        <>
          <div className={style.avatar}>
            <span>{user && getInitials(user.fio)}</span>
          </div>
          <div className={style.userInfo}>
            <span className={style.name}>{user?.fio}</span>
            <span className={style.email}>{user?.email}</span>
          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </header>
  )
}

export default Header

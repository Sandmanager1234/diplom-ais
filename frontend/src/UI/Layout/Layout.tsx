import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { SideBar } from '..'

import styles from './Layout.module.css'

const Layout: FC = () => {
  return (
    <div className={styles.wrap}>
      <SideBar />
      <Suspense fallback={<div>loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout

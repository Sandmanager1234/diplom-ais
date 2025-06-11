import { Link } from 'react-router-dom'

import { useAppSelector } from 'store'

import { Logo, TitledLogo } from 'assets/images'

import styles from './LogoLink.module.css'

const LogoLink = () => {
  const { activeMenu } = useAppSelector((state) => state.resumes)

  return (
    <Link to={'/'}>
      {activeMenu ? (
        <TitledLogo className={styles.logo} />
      ) : (
        <Logo className={styles.logo} />
      )}
    </Link>
  )
}

export default LogoLink

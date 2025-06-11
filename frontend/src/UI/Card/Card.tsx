import { FC, ReactNode } from 'react'

import styles from './Card.module.css'

type Props = {
  children: ReactNode
  onClick?: () => void
}

const Card: FC<Props> = (props) => {
  const { children, onClick } = props

  return (
    <div className={styles.card} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card

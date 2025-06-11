import React, { FC } from 'react'
import styles from './LoaderDots.module.css'

export const LoaderDots: FC = () => {
  return (
    <div className={styles.dotsWrap}>
      <span className={styles.dot}></span>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

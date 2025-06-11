import React from 'react'
import { TTitle } from './types'
import styles from './Title.module.css'

const Title: TTitle.FC = ({ variant, text, children, ...props }) => {
  const dynamicTitleTag = variant === 'h7' ? 'span' : `${variant.toLowerCase()}`

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper} {...props}>
        {React.createElement(dynamicTitleTag, null, children || text)}
      </div>
    </div>
  )
}

Title.displayName = 'Title'

export { Title }

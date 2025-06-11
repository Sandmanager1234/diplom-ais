import { FC, ReactNode } from 'react'

import style from './Description.module.css'

export type DescriptionProps = {
  children?: ReactNode
}

const Description: FC<DescriptionProps> = ({ children }) => {
  return (
    <>
      <div className={style.descriptionTitle}>Описание</div>
      <div className={style.descriptionText}>{children}</div>
    </>
  )
}

export default Description

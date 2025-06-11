import { FC } from 'react'
import cn from 'classnames'

import style from './ChooseTag.module.css'

type Props = {
  description: string
  className: string
  isOnline?: boolean
}

const ChooseTag: FC<Props> = ({ description, className, isOnline }) => {

  const linkStyle=cn(className,style.link)

  return (
    <>
      {isOnline ? (
        <a className={linkStyle} href={description} target='_blank' rel="noreferrer">{description}</a>
      ) : (
        <span className={className}>{description}</span>
      )}
    </>
  )
}

export default ChooseTag

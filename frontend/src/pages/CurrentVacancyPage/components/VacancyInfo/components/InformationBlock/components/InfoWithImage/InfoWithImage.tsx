import { FC, ReactNode } from 'react'

import style from './InfoWithImage.module.css'

type Props = {
  image: ReactNode
  text: string
}

const InfoWithImage: FC<Props> = ({image,text}) => {
  return (
    <div className={style.wrapper}>
      {image}
      <span>{text}</span>
    </div>
  )
}

export default InfoWithImage

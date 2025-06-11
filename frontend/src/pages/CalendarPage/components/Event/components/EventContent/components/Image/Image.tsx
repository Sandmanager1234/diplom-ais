import { FC, ReactNode } from 'react'

import style from './Image.module.css'

type Props = {
  image: ReactNode | null
  initials?: string
}

const Image: FC<Props> = ({ image, initials }) => {

  if (image) return <div className={style.image}>{image}</div>

  return (
    <div className={style.alternativeImage}>
      <span>{initials}</span>
    </div>
  )
}

export default Image

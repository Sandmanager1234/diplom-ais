import { FC, ReactNode } from 'react'

import { TITLES_EVENT_CONTENT } from '../../../../data/models'

import style from './EventContentField.module.css'

export type IEventContentFieldProps = {
  image: ReactNode
  title: TITLES_EVENT_CONTENT
  description: ReactNode
}

const EventContentField: FC<IEventContentFieldProps> = ({ image, title, description }) => {
  return (
    <>
      {image}
      <div className={style.info}>
        <header className={style.title}>{title}</header>
        {description}
      </div>
    </>
  )
}

export default EventContentField

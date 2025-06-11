import { FC } from 'react'

import { IRecipient } from 'services/models'

import { ChooseTag } from './components'

import style from './Description.module.css'

type Props = {
  description: string | IRecipient[]
  className: string
  isOnline?: boolean
}

const Description: FC<Props> = ({ description, className, isOnline }) => {
  return (
    <>
      {Array.isArray(description) ? (
        <div className={style.recipients}>
          {description.map((item) => (
            <span key={item.id} className={className}>
              {item.fullNameRecipient}
            </span>
          ))}
        </div>
      ) : (
        <ChooseTag
          isOnline={isOnline}
          description={description}
          className={className}
        />
      )}
    </>
  )
}

export default Description

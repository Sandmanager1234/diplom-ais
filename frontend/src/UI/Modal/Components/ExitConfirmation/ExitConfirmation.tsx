import { FC } from 'react'

import { CURRENT_ACTION, contentDependingOnAction } from '../../data/models'

import style from './ExitConfirmation.module.css'

type Props = {
  actionType:CURRENT_ACTION
  closeAllModal:()=>void
  closeExitConfirmation:()=>void
}

const ExitConfirmation: FC<Props> = ({ closeAllModal,closeExitConfirmation,actionType }) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>
        <header className={style.title}>{contentDependingOnAction[actionType].title}</header>
        <span className={style.description}>{contentDependingOnAction[actionType].description}</span>
        <div className={style.buttonsContainer}>
          <button onClick={closeAllModal} className={style.btnYes}>Да</button>
          <button onClick={closeExitConfirmation} className={style.btnNo}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export default ExitConfirmation

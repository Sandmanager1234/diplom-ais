import { FC } from 'react'

import { Icon } from 'UI'

import style from './SwitchCalendar.module.css'

type Props = {
  switchCalendar: (next: boolean) => () => void
}

const SwitchCalendar: FC<Props> = ({ switchCalendar }) => {
  return (
    <div className={style.toggleWrapper}>
      <button className={style.btnLeft} onClick={switchCalendar(false)}>
        <Icon.ArrowSwitchCalendar />
      </button>
      <button className={style.btnRight} onClick={switchCalendar(true)}>
        <Icon.ArrowSwitchCalendar />
      </button>
    </div>
  )
}

export default SwitchCalendar

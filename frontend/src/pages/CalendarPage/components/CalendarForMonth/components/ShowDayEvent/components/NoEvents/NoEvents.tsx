import style from './NoEvents.module.css'
import { Dayjs } from 'dayjs'

interface IProps {
  onOpen: (targetDay?: Dayjs) => void
  day: Dayjs
}

const NoEvents = ({ onOpen, day }: IProps) => {

  return (
    <div className={style.noEventsBlock}>
      <span className={style.noEvents}>
        На этот день ничего не запланировано.
      </span>
      <button onClick={() => onOpen(day)} className={style.btn}>
        Создать событие
      </button>
    </div>
  )
}

export default NoEvents

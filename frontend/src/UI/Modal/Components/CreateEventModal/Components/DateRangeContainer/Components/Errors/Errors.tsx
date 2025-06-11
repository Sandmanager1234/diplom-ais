import { FC } from 'react'

import { DateRangeError, LOCATION_OF_ERROR } from '../../DateRangeContainer'

import style from './Errors.module.css'

type Props = {
  error: DateRangeError | null
}

const Errors: FC<Props> = ({ error }) => {
  const renderError = () => {
    switch (error?.locationOfError) {
      case LOCATION_OF_ERROR.START_TIME:
        return (
          <span className={style.startTimeError}>
            Некорректное время. Минимальное время 9:00, максимальное 18:00
          </span>
        )
      case LOCATION_OF_ERROR.END_TIME:
        return (
          <span className={style.endTimeError}>
            Некорректное время. Минимальное время 9:00, максимальное 18:00
          </span>
        )
      case LOCATION_OF_ERROR.ALL:
        return (
          <span className={style.timeRangeError}>
            Некорректное время. Время начала не должно превышать или быть равным времени конца
          </span>
        )
      default:
        return null
    }
  }

  return <>{renderError()}</>
}

export default Errors

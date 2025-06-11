import { FC } from 'react'
import { Dayjs } from 'dayjs'

import { getTopPosition } from '../../services/getTopPosition'

import { TOP_OFFSET } from '../../data/constants'

import { WorkingTime } from './components'

import style from './TimeContaineer.module.css'

type Props = {
  pointReference: Dayjs
}

const TimeContainer: FC<Props> = ({ pointReference }) => {
  return (
    <div className={style.timeContaineer}>
      <div
        style={{
          top: `${
            getTopPosition(pointReference.clone(), pointReference) + TOP_OFFSET
          }% `,
        }}
        className={style.currentTimeLine}
      />
      <WorkingTime />
    </div>
  )
}

export default TimeContainer

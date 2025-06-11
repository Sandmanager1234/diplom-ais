import { WORKING_DAY_TIME } from './data/constants'

import style from './WorkingTime.module.css'

const WorkingTime = () => {
  return (
    <div className={style.timeColumn}>
      <div className={style.timeCell}/>
      {WORKING_DAY_TIME.map((item,index) => (
        <div className={style.timeCell} key={index}>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default WorkingTime

import { FC } from 'react'

import {
  ReadyForBusinessTripEnum,
  ReadyForBusinessTripType,
  RelocationEnum,
  Schedule,
  Employment,
} from 'services/models'
import { Glossary } from 'types'

import { RELOCATION, SCHEDULE } from 'data/constants'

import styles from './Emloyments.module.css'

type Props = {
  employments: Employment[]
  isBusinessTrip: ReadyForBusinessTripEnum
  schedules: Schedule[]
  relocation: RelocationEnum
  gender: string
  glossary: Glossary
}

const Employments: FC<Props> = ({
  employments,
  isBusinessTrip,
  schedules,
  relocation,
  gender,
  glossary,
}) => {
  const readyForBuisnessTrip: ReadyForBusinessTripType = {
    [ReadyForBusinessTripEnum.Ready]: `${
      gender === 'male' ? 'Готов' : 'Готова'
    } к командировкам`,
    [ReadyForBusinessTripEnum.Never]: `Не ${
      gender === 'male' ? 'готов' : 'готова'
    } к командировкам`,
    [ReadyForBusinessTripEnum.Sometimes]: `${
      gender === 'male' ? 'Готов' : 'Готова'
    } к редким командировкам`,
  }

  return (
    <>
      {(employments[0] || isBusinessTrip) && (
        <div className={styles.employmentContainer}>
          <div>
            <span className={styles.titleInfo}>Занятость</span>
            <p className={styles.employmentData}>
              {employments
                .map(
                  (value) =>
                    value && glossary['employment-type'][value.employmentType]
                )
                .join(', ')}
            </p>
          </div>
          {!!schedules.length && (
            <div>
              <span className={styles.titleInfo}>График работы</span>
              <p className={styles.employmentData}>
                {schedules
                  .map((item) => SCHEDULE[item.scheduleType])
                  .join(', ')}
              </p>
            </div>
          )}
          <div className={styles.tripContainer}>
            <div>
              <span className={styles.titleInfo}>Переезд</span>
              <p className={styles.relocationData}>
                {relocation && `Переезд ${RELOCATION[relocation]}`}
              </p>
            </div>
            <div>
              <span className={styles.titleInfo}>
                Готовность к командировкам
              </span>
              <p className={styles.relocationData}>
                {isBusinessTrip
                  ? `${readyForBuisnessTrip[isBusinessTrip]}`
                  : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Employments

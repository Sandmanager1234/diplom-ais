import { FC } from 'react'

import { Glossary } from 'types'

import styles from './PositionSalary.module.css'

type Props = {
  salary: number
  currency: string
  position: string
  grade: string
  glossary: Glossary
}

const PositionSalary: FC<Props> = ({
  glossary,
  position,
  currency,
  salary,
  grade,
}) => {
  const formatterCurrency =
    currency &&
    new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    })

  const checkPosition = (): boolean => {
    return !!position && glossary.position[position] != undefined
  }

  return (
    <div className={styles.positionSalary}>
      <div>
        <h2>{checkPosition() ? glossary.position[position] : position}</h2>
        {!!salary && currency
          ? formatterCurrency && <h2>{formatterCurrency.format(salary)}</h2>
          : !!salary && <span>{salary.toLocaleString()}</span>}
      </div>
      {grade && <h3 className={styles.infoGrade}>{grade}</h3>}
    </div>
  )
}
export default PositionSalary

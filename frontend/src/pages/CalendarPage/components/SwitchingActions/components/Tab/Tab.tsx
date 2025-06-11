import { FC } from 'react'
import cn from 'classnames'

import { VariantsOfCalendar } from '../../../../data/models'

import style from './Tab.module.css'

type Props = {
  tabName: string
  variantCalendar: VariantsOfCalendar
  unitOfTime: VariantsOfCalendar
  switchCalendarVariant: (unitOfTime: VariantsOfCalendar) => void
}

const Tab: FC<Props> = ({
  tabName,
  variantCalendar,
  unitOfTime,
  switchCalendarVariant,
}) => {
  const tabStyle = cn({
    [style.tab]: variantCalendar !== unitOfTime,
    [style.tabActive]: variantCalendar === unitOfTime,
  })

  return (
    <button
      onClick={() => switchCalendarVariant(unitOfTime)}
      className={tabStyle }
    >
      {tabName}
    </button>
  )
}

export default Tab

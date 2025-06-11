import { FC } from 'react'

import { VariantsOfCalendar } from 'pages/CalendarPage/data/models'

import { Tab, SwitchCalendar } from './components'

import { TAB_DATA } from './data/constants'

import style from './SwitchingActions.module.css'

type Props = {
  variantCalendar: VariantsOfCalendar
  switchCalendarVariant: (unitOfTime: VariantsOfCalendar) => void
  switchCalendar: (next: boolean) => () => void
}

const SwitchingActions: FC<Props> = ({
  switchCalendar,
  switchCalendarVariant,
  variantCalendar,
}) => {
  return (
    <div className={style.switchingActions}>
      <div className={style.tabsWrapper}>
        {TAB_DATA.map((item) => (
          <Tab
            key={item.unitOfTime}
            variantCalendar={variantCalendar}
            switchCalendarVariant={switchCalendarVariant}
            tabName={item.name}
            unitOfTime={item.unitOfTime}
          />
        ))}
      </div>
      <SwitchCalendar switchCalendar={switchCalendar} />
    </div>
  )
}

export default SwitchingActions

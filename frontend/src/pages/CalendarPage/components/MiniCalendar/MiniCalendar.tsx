import { FC, useState, useRef, MouseEvent } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from '@mui/material'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import cn from 'classnames'

import { useClickOutside } from 'hooks'

import { Icon } from 'UI'

import { VariantsOfCalendar } from '../../data/models'

import { newTheme } from './data/theme'

import { CustomPickerDay } from './components'

import style from './MiniCalendar.module.css'

type Props = {
  variantCalendar: VariantsOfCalendar
  pointReference: Dayjs
  setPointReference: (pointReference: Dayjs) => void
  getFormat: () => string
  getViewsCalendar: () => any
}

const MiniCalendar: FC<Props> = ({
  getFormat,
  pointReference,
  setPointReference,
  getViewsCalendar,
  variantCalendar,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null)

  const clickRef = useRef<null>(null)

  const onChangeIsOpenState = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const onClose = () => setIsOpen(false)

  useClickOutside(clickRef, onClose)

  const changeCalendarValue = (newValue: Dayjs) => {
    setPointReference(newValue)
    setIsOpen(false)
    setHoveredDay(null)
  }

  const btnStyle = cn({
    [style.btn]: !isOpen,
    [style.btnActive]: isOpen,
  })

  return (
    <div style={{ position: 'relative' }}>
      <button className={btnStyle} onClick={onChangeIsOpenState}>
        <span className={style.currentDateRange}>{getFormat()}</span>
        <Icon.ArrowOpenMiniCalendar />
      </button>
      {isOpen && (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <ThemeProvider theme={newTheme({}, variantCalendar)}>
            <DateCalendar
              ref={clickRef}
              dayOfWeekFormatter={(day: Dayjs) => {
                return day.format('dd').toUpperCase()
              }}
              showDaysOutsideCurrentMonth
              views={getViewsCalendar()}
              value={pointReference}
              onMonthChange={() => setIsOpen(true)}
              onChange={changeCalendarValue}
              slots={{
                day: variantCalendar === 'week' ? CustomPickerDay : undefined,
              }}
              slotProps={{
                day: (ownerState) =>
                  ({
                    issameweek: pointReference.isSame(ownerState.day, 'week')
                      ? 1
                      : 0,
                    issamemonth: pointReference.isSame(ownerState.day, 'month')
                      ? 1
                      : 0,
                    selectedDay: pointReference,
                    hoveredDay,
                    onPointerOver: () => {
                      setHoveredDay(ownerState.day)
                    },
                    onPointerLeave: () => setHoveredDay(null),
                  } as any),
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      )}
    </div>
  )
}

export default MiniCalendar

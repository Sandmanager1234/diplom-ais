import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import {
  DateCalendar,
  LocalizationProvider,
  TimeField,
  TimeValidationError,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import cn from 'classnames'

import { useClickOutside } from 'hooks'
import { Icon } from 'UI'

import { newTheme } from './data/theme'

import Errors from './Components/Errors/Errors'

import style from './DateRangeContainer.module.css'

type Props = {
  startTime: Dayjs
  endTime: Dayjs
  minTime: Dayjs
  isFullDay: boolean
  date: Dayjs
  setDate: (date: Dayjs) => void
  setStartTime: (date: Dayjs) => void
  setEndTime: (date: Dayjs) => void
}

export enum LOCATION_OF_ERROR {
  ALL = 'all',
  START_TIME = 'startTime',
  END_TIME = 'endTime',
}

type Error = TimeValidationError | 'errorInTimeRange' | null

export type DateRangeError = {
  locationOfError: LOCATION_OF_ERROR
  error: Error
}

const DateRangeContainer: FC<Props> = ({
                                         isFullDay,
                                         startTime,
                                         endTime,
                                         minTime,
                                         date,
                                         setDate,
                                         setStartTime,
                                         setEndTime,
                                       }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState(date.format('YYYY-MM-DD'))

  const [error, setError] = useState<DateRangeError | null>(null)
  const [errorAllFields, setErrorAllFields] = useState<DateRangeError | null>(
    null,
  )

  useEffect(() => {
    if (endTime.diff(startTime) <= 0) {
      setError(null)
      setErrorAllFields({
        locationOfError: LOCATION_OF_ERROR.ALL,
        error: 'errorInTimeRange',
      })
    } else setErrorAllFields(null)
  }, [startTime, endTime])

  const startDateStyle = cn(style.startDate, {
    [style.startDateError]:
    error?.locationOfError === LOCATION_OF_ERROR.START_TIME || errorAllFields,
  })

  const endDateStyle = cn(style.endDate, {
    [style.endDateError]:
    error?.locationOfError === LOCATION_OF_ERROR.END_TIME || errorAllFields,
  })

  const dateDisplayStyle = cn(style.dateDisplay, {
    [style.dateDisabled]: isFullDay,
  })

  const errors = error || errorAllFields

  const ref = useRef<HTMLDivElement>(null)

  const openCalendar = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closeCalendar = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  useClickOutside(ref, closeCalendar)

  const changeDate = (newValue: Dayjs) => {
    if (newValue) {
      setDate(newValue)
      setTempDate(newValue.format('YYYY-MM-DD'))
    }

    setIsOpen(false)
  }

  const errorHandler = (
    err: TimeValidationError,
    value: Dayjs | null,
    locationOfError: LOCATION_OF_ERROR,
  ) => {
    setError(
      err && value?.diff(startTime, 'day') === 0
        ? {
          locationOfError: locationOfError,
          error: err,
        }
        : null,
    )
  }

  const changeTime = (
    newValue: Dayjs | null,
    callBack: (newValue: Dayjs) => void,
  ) => newValue && callBack(newValue)

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempDate(e.target.value)
  }

  const handleDateBlur = () => {
    const tempDayjs = dayjs(tempDate, 'YYYY-MM-DD')
    if (tempDayjs.diff(dayjs()) >= 0 && tempDayjs.diff(dayjs('9999-12-31', 'YYYY-MM-DD')) <= 0)
      changeDate(tempDayjs)
    else
      setTempDate(date.format('YYYY-MM-DD'))
  }

  return (
    <div className={style.wraper}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={{
          fieldHoursPlaceholder() {
            return 'ЧЧ'
          },
          fieldMinutesPlaceholder() {
            return 'ММ'
          },
        }}
      >
        <ThemeProvider theme={newTheme({})}>
          <div className={style.dateRange}>
            <div className={startDateStyle}>
              <span>Начало</span>
              <div style={{ position: 'relative' }}>
                {isOpen && (
                  <DateCalendar
                    showDaysOutsideCurrentMonth
                    disabled={isFullDay}
                    ref={ref}
                    minDate={dayjs()}
                    value={date}
                    onChange={changeDate}
                  />
                )}
                <div className={dateDisplayStyle}>
                  <input type="date" value={tempDate} onChange={handleDateChange} onBlur={handleDateBlur} />
                  <div onClick={openCalendar}>
                    <Icon.Calendar />
                  </div>
                </div>
              </div>
              <TimeField
                disabled={isFullDay}
                onError={(err, value) =>
                  errorHandler(err, value, LOCATION_OF_ERROR.START_TIME)
                }
                minTime={minTime}
                maxTime={startTime.startOf('day').add(18, 'hours')}
                value={startTime}
                onChange={(newValue) => changeTime(newValue, setStartTime)}
              />
            </div>
            <div className={endDateStyle}>
              <span>Конец</span>
              <div className={style.dateDisabled}>
                <span>{date.format('DD.MM.YYYY')}</span>
                <Icon.Calendar />
              </div>
              <TimeField
                disabled={isFullDay}
                onError={(err, value) =>
                  errorHandler(err, value, LOCATION_OF_ERROR.END_TIME)
                }
                minTime={minTime}
                maxTime={endTime.startOf('day').add(18, 'hours')}
                value={endTime}
                onChange={(newValue) => changeTime(newValue, setEndTime)}
              />
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
      <Errors error={errors} />
    </div>
  )
}

export default DateRangeContainer

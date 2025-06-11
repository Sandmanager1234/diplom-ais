import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { Dayjs } from 'dayjs'

import { CustomPickersDay } from './CustomPickersDayStyled'

import { isInSameWeek } from './services/isInSameWeek'

const CustomPickerDay = (
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null
    hoveredDay?: Dayjs | null
    issameweek?: boolean
    issamemonth?:boolean
  }
) => {
  const { day, selectedDay, hoveredDay, issameweek, issamemonth , ...other } = props

  return (
    <CustomPickersDay
      {...other}
      day={day}
      issameweek={issameweek}
      issamemonth={issamemonth}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  )
}

export default CustomPickerDay

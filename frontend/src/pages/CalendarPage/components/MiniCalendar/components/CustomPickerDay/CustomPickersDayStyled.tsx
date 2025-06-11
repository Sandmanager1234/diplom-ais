import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { styled } from '@mui/material/styles'
import { Dayjs } from 'dayjs'

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean
  isHovered: boolean
  issameweek?: boolean
  issamemonth?: boolean
}

export const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(
  ({ isSelected, isHovered, issameweek, issamemonth }) => ({
    borderRadius: 0,
    ...(isSelected && {
      backgroundColor: '#2969FF',
      color: issamemonth ? '#FFFFFF' : '#83A8FE',
      '&:hover, &:focus': {
        backgroundColor: '#2969FF',
      },
    }),
    ...(isHovered && {
      backgroundColor: issameweek ? '#0246E7' : '#EFF0F5',
      '&:hover, &:focus': {
        backgroundColor: issameweek ? '#0246E7' : '#EFF0F5',
      },
    }),
  })
) as React.ComponentType<CustomPickerDayProps>

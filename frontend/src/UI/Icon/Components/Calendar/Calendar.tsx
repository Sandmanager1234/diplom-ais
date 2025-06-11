interface ICalendar {
  strokeColor?: string
}

const Calendar = ({ strokeColor }: ICalendar) => (
  (strokeColor = strokeColor || '#1D1F31'),
  (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5.25'
        y='7.5'
        width='13.5'
        height='11.25'
        rx='2'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M8.75 5.25V7.5'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M15.25 5.25V7.5'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M5.25 10.75H18.75' stroke={strokeColor} strokeWidth='1.5' />
    </svg>
  )
)

export default Calendar

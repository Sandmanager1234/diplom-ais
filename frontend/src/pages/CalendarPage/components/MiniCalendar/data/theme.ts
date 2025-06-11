import { createTheme } from '@mui/material'
import { VariantsOfCalendar } from 'pages/CalendarPage/data/models'

export const newTheme = (theme: any, variantCalendar: VariantsOfCalendar) =>
  createTheme({
    ...theme,
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fill: '#231F20',
            '&:hover': {
              fill: '#2969FF',
            },
          },
        },
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            display: 'none',
          },
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          root: {
            gap: '15px',
          },
          spacer: {
            display: 'none',
          },
          button: {
            fontSize: '22px',
            margin: '0px',
            padding: '0px',
            width: 'max-content',
            '&:hover': {
              background: 'transparent',
            },
          },
        },
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            background: 'white',
            boxShadow: '0px 4px 25.700000762939453px 0px rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
            margin: '0px',
            position: 'absolute',
            top: '44px',
            zIndex: '1000',
            width: '248px',
            height: '264px',
            padding: '16px',
          },
        },
      },
      MuiPickersFadeTransitionGroup: {
        styleOverrides: {
          root: {
            width: '216px',
            height: '100%',
            margin: '0 auto',
          },
        },
      },
      MuiPickersSlideTransition: {
        styleOverrides: {
          root: {
            '&.MuiDayCalendar-slideTransition': {
              minHeight: '162px',
            },
          },
        },
      },
      MuiYearCalendar: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
            width: '216px',
            height: '100%',
            margin: '0 auto',
          },
        },
      },
      MuiPickersYear: {
        styleOverrides: {
          root: {
            flexBasis: '66px',
            width: '66px',
          },
          yearButton: {
            width: '100%',
            borderRadius: '4px',
            '&.Mui-selected': {
              background: '#2969FF',
            },
            '&.Mui-selected:focus': {
              background: '#2969FF',
            },
            '&.Mui-selected:hover': {
              background: '#0246E7',
            },
          },
        },
      },
      MuiMonthCalendar: {
        styleOverrides: {
          root: {
            width: '100%',
            minHeight: '188px',
            padding: '0',
            justifyContent: 'space-between',
          },
        },
      },
      MuiPickersMonth: {
        styleOverrides: {
          monthButton: {
            width: '66px',
            height: '36px',
            padding: '8px 12px',
            margin: '0',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '19.6px',
            textAlign: 'center',
            borderRadius: '4px',
            '&.Mui-selected': {
              background: '#2969FF',
            },
            '&.Mui-selected:focus': {
              background: '#2969FF',
            },
            '&.Mui-selected:hover': {
              background: '#0246E7',
            },
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            width: '216px',
            minHeight: '36px',
            margin: '0 auto',
            marginBottom: '10px',
            padding: '8px 12px',
            background: '#EFF0F5',
            borderRadius: '4px',
          },
          switchViewButton: {
            display: 'none',
          },
          labelContainer: {
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '19.6px',
          },
          label: {
            '&:hover': {
              color: '#2969FF',
            },
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          root: {
            height: '100%',
          },
          header: {
            justifyContent: 'space-between',
            marginBottom: '5px',
          },
          weekDayLabel: {
            width: '24px',
            height: '24px',
            fontSize: '12px',
            lineHeight: '16.8px',
          },
          slideTransition: {
            height: 'max-content',
          },
          monthContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '162px',
          },
          weekContainer: {
            justifyContent: variantCalendar === 'week' ? '' : 'space-between',
            borderRadius: '3px',
            overflow: 'hidden',
            margin: '0',
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            borderRadius: '3px',
            width: variantCalendar === 'week' ? '' : '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '19.6px',
            textAlign: 'center',
            margin: '0',
            color: '#E1E1E1',
            ':not(.Mui-selected)': {
              border: 'none',
            },
            '&.Mui-selected': {
              background: '#2969FF',
            },
            '&.Mui-selected:focus': {
              background: '#2969FF',
            },
            '&.Mui-selected:hover': {
              background: '#0246E7',
            },
          },
          today: {
            color: '#2969FF',
          },
          dayOutsideMonth: {
            color: '#231F20',
          },
        },
      },
    },
  })

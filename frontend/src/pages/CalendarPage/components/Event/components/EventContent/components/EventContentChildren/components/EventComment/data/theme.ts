import { createTheme } from '@mui/material'

export const newTheme = (theme: any) =>
  createTheme({
    ...theme,
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'white',
            boxShadow: '0px 4px 25.700000762939453px 0px rgba(0, 0, 0, 0.4)',
            fontSize: '18px',
            padding: '15px',
            color: 'black',
            maxWidth: '364px',
            width: 'max-content',
          },
        },
      },
    },
  })

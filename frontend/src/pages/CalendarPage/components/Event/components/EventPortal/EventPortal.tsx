import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Popover} from '@mui/material'

type Props = {
  isMonth?: boolean
  isOpen: boolean
  children: ReactNode
  anchorEl: HTMLDivElement | null
}

const EventPortal: FC<Props> = ({ isMonth, isOpen, children, anchorEl }) => {
  if (!isOpen) return null

  if (isMonth) return createPortal(children, document.body)

  return (
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isOpen}
      >
        {children}
      </Popover>
  )
}

export default EventPortal

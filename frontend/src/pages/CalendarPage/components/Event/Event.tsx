import { CSSProperties,  MouseEvent, useRef, useState } from 'react'
import cn from 'classnames'

import { IMeeting } from 'services/models'

import { useClickOutside } from 'hooks'

import { EventContent, EventPortal } from './components'

import { getLeftPosition } from './services/getLeftPosition'

import style from './Event.module.css'

interface IProps {
  event: IMeeting
  inlineStyle?: CSSProperties
  className: string
  isMonth?: boolean
  updateMeetings: () => void
}

const Event = ({ event, inlineStyle, className, isMonth, updateMeetings }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const onOpen = (e: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget)
    setIsOpen(true)
  }

  const onClose = () => {
    isOpen && setIsOpen(false)
  }

  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, onClose)

  const targetTop = isMonth
    ? ref?.current?.parentElement?.parentElement?.offsetTop!
    : ref?.current?.parentElement?.offsetTop!

  const eventStyle = cn(className, {
    [style.event]: isOpen,
  })

  return (
    <div ref={ref} onClick={onOpen} style={inlineStyle} className={eventStyle}>
      <EventPortal isMonth={isMonth} isOpen={isOpen} anchorEl={anchorEl}>
        <EventContent
          isMonth={isMonth}
          left={getLeftPosition(ref, isMonth)}
          top={targetTop}
          event={event}
          closeComponent={() => setIsOpen(false)}
          updateMeetings={updateMeetings}
        />
      </EventPortal>
      <span>{event.name}</span>
    </div>
  )
}

export default Event

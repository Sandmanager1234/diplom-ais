import { FC, ReactNode } from 'react'

import { EventComment, EventCommentProps } from './components/EventComment'
import {
  EventContentField,
  IEventContentFieldProps,
} from './components/EventContentField'

import style from './EventContentChildren.module.css'

type Props = {
  children: ReactNode
}

type Composition = {
  Comment: FC<EventCommentProps>
  ContentField: FC<IEventContentFieldProps>
}

const EventContentChildren: FC<Props> & Composition = ({ children }) => {
  return <div className={style.childrenWrap}>{children}</div>
}

EventContentChildren.Comment = EventComment
EventContentChildren.ContentField = EventContentField

export default EventContentChildren

import { FC, ReactNode, } from 'react'
import { ThemeProvider, Tooltip } from '@mui/material'

import { TITLES_EVENT_CONTENT } from '../../../../data/models'

import { newTheme } from './data/theme'

import style from './EventComment.module.css'

export type EventCommentProps = {
  title: TITLES_EVENT_CONTENT
  description: ReactNode
  comment: string
}

const EventComment: FC<EventCommentProps> = ({ title, comment }) => (
  <div className={style.infoComment}>
    <header className={style.title}>{title}</header>
    <ThemeProvider theme={newTheme}>
      <Tooltip title={comment}>
        <span className={style.textComment}>{comment}</span>
      </Tooltip>
    </ThemeProvider>
  </div>
)

export default EventComment

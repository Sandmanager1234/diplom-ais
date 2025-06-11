import { MouseEvent } from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'

import { IMeeting } from 'services/models'

import { Icon } from 'UI'

import {
  Description,
  EventContentChildren,
  Image,
} from './components'

import { TITLES_EVENT_CONTENT } from './data/models'

import { getInitials } from './services/getInitials'

import style from './EventContent.module.css'
import { meetingApi } from '../../../../../../services/meetingApi/meetingApi'
import { useAppDispatch } from '../../../../../../store'
import {changeRedactingMeeting } from '../../../../../../store/reducers/calendarReducer'

interface IProps {
  event: IMeeting,
  left: number,
  top: number,
  closeComponent: () => void;
  isMonth?: boolean,
  updateMeetings: () => void
}

const EventContent = ({ event, left, top, closeComponent, isMonth, updateMeetings }: IProps) => {
  const dispatch = useAppDispatch()

  const date =
    dayjs(event.startDate).format('HH:mm') +
    ' - ' +
    dayjs(event.endDate).format('HH:mm, ') +
    dayjs(event.endDate).format('dd DD.MM.YYYY')

  const preventClosureEventContent = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation()

  const wrapperStyle = cn({
    [style.eventContentPopover]: !isMonth,
    [style.eventContentWrap]: isMonth,
  })

  const onRedactButtonClickHandler = () => {
    dispatch(changeRedactingMeeting(event))
    closeComponent()
  }

  const onDeleteButtonClickHandler = () => {
    meetingApi.deleteMeeting(event.id).then(() => {
      updateMeetings()
      closeComponent()
    })
  }

  return (
    <div
      onClick={preventClosureEventContent}
      style={{
        left: left,
        top: top,
      }}
      className={wrapperStyle}
    >
      <header className={style.title}>{event.name}</header>
      <EventContentChildren>
        <EventContentChildren.ContentField
          title={TITLES_EVENT_CONTENT.TIME}
          description={
            <Description description={date} className={style.text} />
          }
          image={<Image image={<Icon.EventTime />} />}
        />
      </EventContentChildren>
      <EventContentChildren>
        <EventContentChildren.ContentField
          title={TITLES_EVENT_CONTENT.PLACE}
          description={
            <Description
              description={event.place}
              className={style.text}
              isOnline={event.isOnline}
            />
          }
          image={<Image image={<Icon.EventPlace />} />}
        />
      </EventContentChildren>
      <EventContentChildren>
        <EventContentChildren.ContentField
          title={TITLES_EVENT_CONTENT.RECIPIENTS}
          description={
            <Description description={event.recipient} className={style.text} />
          }
          image={<Image image={<Icon.Recipients />} />}
        />
      </EventContentChildren>
      <EventContentChildren>
        <EventContentChildren.ContentField
          title={TITLES_EVENT_CONTENT.AUTHOR}
          description={
            <Description description={'Author Author'} className={style.text} />
          }
          image={<Image initials={getInitials('Author Author')} image={null} />}
        />
      </EventContentChildren>
      <EventContentChildren>
        <EventContentChildren.ContentField
          title={TITLES_EVENT_CONTENT.APPLICANT}
          description={
            <Description
              description={event.applicantFio}
              className={style.text}
            />
          }
          image={
            <Image initials={getInitials(event.applicantFio)} image={null} />
          }
        />
      </EventContentChildren>
      <EventContentChildren>
        <EventContentChildren.Comment
          comment={event.comment}
          title={TITLES_EVENT_CONTENT.COMMENT}
          description={
            <Description
              description={event.comment}
              className={style.textComment}
            />
          }
        />
      </EventContentChildren>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <button className={style.button} onClick={onRedactButtonClickHandler}>
          <Icon.Edit /> Редактировать
        </button>
        <button className={style.button} onClick={onDeleteButtonClickHandler}>
          <Icon.Trash /> Удалить
        </button>
      </div>
    </div>
  )
}

export default EventContent

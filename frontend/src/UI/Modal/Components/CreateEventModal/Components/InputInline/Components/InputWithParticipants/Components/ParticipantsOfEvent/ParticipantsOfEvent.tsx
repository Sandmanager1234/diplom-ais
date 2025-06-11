import { FC } from 'react'

import {
  deleteSelectedApplicant,
  deleteSelectedRecipient,
} from 'store/slices/meetingSlice'

import { ISuggestionsDTO } from 'services/models'

import { useAppDispatch } from 'store'
import { Icon } from 'UI/index'

import { INPUT_NAME } from '../../../../../../data/models'

import style from './ParticipantsOfEvent.module.css'

type Props = {
  name: INPUT_NAME
  participant: ISuggestionsDTO[]
}

const ParticipantsOfEvent: FC<Props> = ({ participant, name }) => {
  const dispatch = useAppDispatch()

  const deleteRecipients = (payload: string) => () => {
    dispatch(
      name === INPUT_NAME.RECIPIENTS
        ? deleteSelectedRecipient(payload)
        : deleteSelectedApplicant()
    )
  }

  return (
    <>
      {participant?.map((item) => (
        <div key={item.value} className={style.participant}>
          {item.value}
          <button
            type='button'
            onClick={deleteRecipients(item.code)}
            className={style.btn}
          >
            <Icon.CrossParticipantOfEvent />
          </button>
        </div>
      ))}
    </>
  )
}

export default ParticipantsOfEvent

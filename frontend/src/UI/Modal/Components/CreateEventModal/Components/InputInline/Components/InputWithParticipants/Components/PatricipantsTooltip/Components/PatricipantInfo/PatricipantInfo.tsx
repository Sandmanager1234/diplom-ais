import { FC } from 'react'

import {
  addSelectedRecipients,
  setSelectedApplicant,
} from 'store/slices/meetingSlice'

import { getInitials } from 'utils/getInitials'

import { ISuggestionsDTO } from 'services/models'

import { useAppDispatch } from 'store'

import { INPUT_NAME } from '../../../../../../../../data/models'

import style from './PatricipantInfo.module.css'

type Props = {
  participant: ISuggestionsDTO
  name: INPUT_NAME
  resetInputValue: (name: INPUT_NAME) => void
}

const PatricipantInfo: FC<Props> = ({ participant, name, resetInputValue }) => {
  const dispatch = useAppDispatch()

  const addRecipients = () => {
    dispatch(
      name === INPUT_NAME.RECIPIENTS
        ? addSelectedRecipients(participant)
        : setSelectedApplicant(participant)
    )
    resetInputValue(name)
  }

  const participantEmail = participant.entityFields?.e_mail || participant.code

  return (
    <div onMouseDown={addRecipients} className={style.wrapper}>
      <div className={style.avatar}>
        <span>{getInitials(participant.value)}</span>
      </div>
      <div className={style.info}>
        <span>{participant.value}</span>
        <span>{participantEmail}</span>
      </div>
    </div>
  )
}

export default PatricipantInfo

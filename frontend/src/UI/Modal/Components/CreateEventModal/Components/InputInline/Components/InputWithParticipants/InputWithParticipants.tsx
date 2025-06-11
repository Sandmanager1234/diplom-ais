import { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react'

import { ISuggestionsDTO } from 'services/models'

import { useAppSelector } from 'store'

import { INPUT_NAME } from '../../../../data/models'

import { ParticipantsOfEvent, PatricipantsTooltip } from './Components'

import style from './InputWithParticipants.module.css'
import {
  setSelectedApplicant,
  addSelectedRecipients,
} from '../../../../../../../../store/slices/meetingSlice'

interface IProps {
  value: string
  name: INPUT_NAME
  participants: ISuggestionsDTO[]
  styleInput: string
  otherProps: HTMLAttributes<HTMLInputElement>
  handleBlurOrFocus: (e: ChangeEvent<HTMLInputElement>) => void
  resetInputValue: (name: INPUT_NAME) => void
}

const InputWithParticipants = ({
  styleInput,
  handleBlurOrFocus,
  otherProps,
  participants,
  name,
  value,
  resetInputValue,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { redactingRecipients, redactingApplicant } = useAppSelector(
    (state) => state.calendar
  )

  const { selectedRecipients, selectedApplicant } = useAppSelector(
    (state) => state.meetings
  )

  const applicantOrRecipients =
    name === INPUT_NAME.RECIPIENTS ? selectedRecipients : selectedApplicant

  const disabledInputValue =
    name === INPUT_NAME.RECIPIENTS
      ? selectedRecipients.length === 5
      : selectedApplicant.length === 1

  const hasParticipants = !!selectedRecipients.length || !!selectedApplicant

  const changeStateDependingOnEvent = (e: ChangeEvent<HTMLInputElement>) => {
    handleBlurOrFocus(e)
    if (e.type === 'focus') setIsOpen(true)
    else setIsOpen(false)
  }

  useEffect(() => {
    if (name === INPUT_NAME.RECIPIENTS) {
      if (redactingRecipients) addSelectedRecipients(redactingRecipients)
    } else if (redactingApplicant) setSelectedApplicant(redactingApplicant)
  }, [])

  return (
    <div className={style.inputWithParticipantsWrapper}>
      {isOpen && value.length > 2 && (
        <PatricipantsTooltip
          resetInputValue={resetInputValue}
          name={name}
          participants={participants}
        />
      )}
      {hasParticipants && (
        <ParticipantsOfEvent name={name} participant={applicantOrRecipients} />
      )}
      <input
        disabled={disabledInputValue}
        value={value}
        name={name}
        onBlur={changeStateDependingOnEvent}
        onFocus={changeStateDependingOnEvent}
        className={styleInput}
        {...otherProps}
      />
    </div>
  )
}

export default InputWithParticipants

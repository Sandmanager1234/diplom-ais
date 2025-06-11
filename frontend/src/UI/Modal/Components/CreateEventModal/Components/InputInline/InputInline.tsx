import { ChangeEvent, HTMLAttributes, ReactNode, useState } from 'react'
import cn from 'classnames'

import { ISuggestionsDTO } from 'services/models'

import { useAppSelector } from 'store'

import { INPUT_NAME } from '../../data/models'

import { InputWithParticipants } from './Components'

import styles from './InputInline.module.css'

interface IInputInline extends HTMLAttributes<HTMLInputElement> {
  inputType: 'big' | 'image' | 'salaryInput'
  value: string
  image?: ReactNode
  participants?: ISuggestionsDTO[]
  name: INPUT_NAME
  resetInputValue?: (name: INPUT_NAME) => void
}

enum ErrorText {
  REQUIRED = 'Поле обязательно для заполнения',
  UNCORRECT_LINK = 'Неверное значение, ссылка должна начинаться с http или https',
}

type Error = {
  isError: boolean
  errorText: ErrorText
}

const InputInline = ({ ...props }: IInputInline) => {
  const {
    inputType,
    image,
    value,
    participants,
    name,
    resetInputValue,
    ...otherProps
  } = props

  const { selectedApplicant, selectedRecipients } = useAppSelector(
    (state) => state.meetings
  )

  const [error, setError] = useState<Error | null>(null)

  const handleBlurOrFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const uncorrectLink = e.type === 'blur' && !value.startsWith('http') && !!value?.trim().length

    const emptyField = e.type === 'blur' && !value?.trim().length

    const emptyApplicants = e.type === 'blur' && !selectedApplicant.length && !participants?.length

    switch (name) {
      case INPUT_NAME.RECIPIENTS:
        setError(null)
        break
      case INPUT_NAME.APPLICAMTS:
        setError({
          isError: emptyApplicants,
          errorText: ErrorText.REQUIRED,
        })
        break
      case INPUT_NAME.LINK:
        setError({
          isError: value?.trim().length ? uncorrectLink : emptyField,
          errorText: value?.trim().length ? ErrorText.UNCORRECT_LINK : ErrorText.REQUIRED,
        })
        break
      default:
        setError({
          isError: emptyField,
          errorText: ErrorText.REQUIRED,
        })
    }
  }

  const styleInputWrap = cn({
    [styles.inputWrap]: !error?.isError,
    [styles.inputWrapError]: error?.isError,
  })

  return (
    <div className={styles.wrap}>
      <div className={styleInputWrap}>
        <div className={styles.image}>{image}</div>
        {participants ? (
          <InputWithParticipants
            name={name}
            value={value}
            handleBlurOrFocus={handleBlurOrFocus}
            resetInputValue={resetInputValue!}
            styleInput={styles[inputType]}
            participants={participants}
            otherProps={otherProps}
          />
        ) : (
          <input
            value={value}
            name={name}
            onBlur={handleBlurOrFocus}
            onFocus={handleBlurOrFocus}
            className={styles[inputType]}
            {...otherProps}
          />
        )}
      </div>
      {error?.isError && <div className={styles.error}>{error.errorText}</div>}
    </div>
  )
}

export default InputInline

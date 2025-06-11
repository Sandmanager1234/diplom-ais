import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'
import { IMaskInput } from 'react-imask'

interface IInput extends React.HTMLAttributes<HTMLInputElement> {
  title: string
  inputType: 'defaultInput' | 'mediumInput' | 'salaryInput'
  error?: string
  defaultValue?: string | number
  name?: string
  type?: string
  required?: boolean
  pattern?: string
  min?: string | number | Date
  max?: string | number | Date
  maxLength?: number
  value?: string | number
  minLength?: number
  isFocus?: boolean
  isError?: boolean
}

export interface IMaskedProps {
  mask: any
  onAccept: (value: any, mask: any) => void
  min?: string | number | Date
  max?: string | number | Date
}

export const Input: React.FC<IInput & { masked?: IMaskedProps }> = (props) => {
  const {
    isFocus = false,
    title,
    inputType,
    defaultValue,
    type,
    error,
    value,
    masked,
    placeholder,
    isError = false,
    pattern,
    ...otherProps
  } = props

  const wrapStyleInput = classNames({
    [styles[inputType]]: true,
  })

  const [focused, setFocused] = useState(isFocus)

  function handleFocus() {
    setFocused(true)
  }

  const handleOnAccept = (value: unknown, maskRef: any): void => {
    if (masked?.onAccept) {
      masked.onAccept(value, maskRef)
    }
  }

  return (
    <div className={wrapStyleInput}>
      <span className={styles.title}>{title}</span>
      {masked ? (
        <IMaskInput
          className={styles.inputStyle}
          defaultValue={defaultValue}
          mask={masked.mask}
          focused={focused.toString()}
          onAccept={handleOnAccept}
          onBlur={handleFocus}
          placeholder={placeholder}
          value={value}
          min={masked.min}
          max={masked.max}
          // pattern='^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
        />
      ) : (
        <input
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          className={isError ? styles.inputErrorStyle : styles.inputStyle}
          defaultValue={defaultValue}
          type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onBlur={handleFocus}
          maxLength={254}
          focused={focused.toString()}
          pattern={pattern}
          {...otherProps}
        />
      )}
      <span className={isError ? styles.activeError : styles.error}>
        {error}
      </span>
    </div>
  )
}

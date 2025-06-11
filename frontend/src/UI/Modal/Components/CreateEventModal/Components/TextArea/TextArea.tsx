import { ChangeEvent, FC, useState } from 'react'
import cn from 'classnames'

import style from './TextArea.module.css'

type Props = {
  value: string
  handleCahnge: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<Props> = ({ value, handleCahnge }) => {
  const [error, setError] = useState(false)

  const blurOrFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.type==='blur' && value && !value.trim().length) {
      setError(true)
    }
    else setError(false)
  }

  const textAreaStyle = cn(style.textarea, {
    [style.textareaError]: error,
  })

  return (
    <>
      <textarea
        maxLength={1000}
        value={value}
        className={textAreaStyle}
        placeholder={'Комментарий'}
        onChange={handleCahnge}
        onBlur={blurOrFocus}
        onFocus={blurOrFocus}
      />
      {error && <p className={style.errorText}>Введено недопустимое значение поля "Комментарий"</p>}
    </>
  )
}

export default TextArea

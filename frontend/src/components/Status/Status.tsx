import { MouseEvent, useRef, useState, CSSProperties } from 'react'
import classNames from 'classnames'

import { useClickOutside } from 'hooks'

import { Icon } from 'UI'

import { DotStatus } from 'pages/ProfileApplicant/components/dotStatus/DotStatus'

import { Option } from 'types/option'

import styles from './Status.module.css'

type StatusOption<T = string> = Option<T> & {
  color: CSSProperties['color']
}

type Props<T> = {
  options: StatusOption<T>[]
  currentOption: StatusOption<T>
  onChange: (arg: T) => void
}

export const Status = <T = string,>(props: Props<T>) => {
  const { options, currentOption, onChange } = props

  const [isOpen, setIsOpen] = useState(false)

  const onChangeIsOpenStatusState = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const clickRef = useRef(null)

  const onClose = () => setIsOpen(false)
  useClickOutside(clickRef, onClose)

  const statusStyle = classNames({
    [styles.statusProfileActive]: isOpen,
    [styles.statusProfile]: !isOpen,
  })

  const selectStatusStyle = classNames({
    [styles.selectStatus]: isOpen,
    [styles.hidden]: !isOpen,
  })

  return (
    <div className={styles.statusField}>
      <div className={statusStyle} onClick={onChangeIsOpenStatusState}>
        {<DotStatus color={currentOption.color} />}
        {currentOption.label}
        <button className={styles.arrowBtn}>
          {isOpen ? <Icon.ArrowChewronUp /> : <Icon.ArrowChewronDown />}
        </button>
        <div ref={clickRef} className={selectStatusStyle}>
          {options.map((item) => (
            <div
              key={item.label}
              className={styles.statusDropDown}
              onClick={() => {
                onChange(item.value)
              }}
            >
              {<DotStatus color={item.color} />}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

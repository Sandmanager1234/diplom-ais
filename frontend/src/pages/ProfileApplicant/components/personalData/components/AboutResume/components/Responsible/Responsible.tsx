import { FC, MouseEvent, useRef, useState } from 'react'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from 'store'
import { editApplicantResponsible } from 'store/reducers/applicantReducer'
import { useClickOutside } from 'hooks'

import { Icon } from 'UI'
import { ResponsibleHr } from 'types/vacancies'

import styles from './Responsible.module.css'

type Props = {
  responsibleHr: ResponsibleHr | null
  applicantID: string
}

const Responsible: FC<Props> = ({ responsibleHr, applicantID }) => {
  const dispatch = useAppDispatch()
  const { hrEmails } = useAppSelector((state) => state.tasks)

  const [isOpen, setIsOpen] = useState(false)
  const clickRef = useRef<HTMLDivElement>(null)

  const onClose = () => setIsOpen(false)
  useClickOutside(clickRef, onClose)

  const onChangeIsOpenResponsibleState = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClickHr = (newHr: ResponsibleHr) => {
    const allDataByNewHr = hrEmails.find((hr) => hr === newHr)!
    dispatch(
      editApplicantResponsible({
        applicantID,
        newResponsibleHr: allDataByNewHr,
      })
    )
  }

  const responsibleStyle = classNames({
    [styles.dropDownActive]: isOpen,
    [styles.dropDown]: !isOpen,
  })

  const selectResponsibleStyle = classNames({
    [styles.selectHr]: isOpen,
    [styles.hidden]: !isOpen,
  })

  return (
    <div className={styles.responsible}>
      <Icon.ResponsibleHr />
      Ответственный:
      <div
        className={responsibleStyle}
        onClick={onChangeIsOpenResponsibleState}
      >
        <span>{responsibleHr?.fio || 'Нет ответственного'}</span>
        <button className={styles.arrowBtn}>
          {isOpen ? <Icon.ArrowChewronUp /> : <Icon.ArrowChewronDown />}
        </button>
        <div ref={clickRef} className={selectResponsibleStyle}>
          {hrEmails.map((hr, index) => (
            <p
              key={index}
              className={styles.hrDropDown}
              onClick={() => handleClickHr(hr)}
            >
              {hr.fio}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Responsible

import { FC, MouseEvent, useRef, useState } from 'react'
import classNames from 'classnames'

import { useClickOutside } from 'hooks'
import { useAppDispatch, useAppSelector } from 'store'
import { changeVacancyResponsibleHr } from 'store/reducers/currentVacancyReducer'

import { Icon } from 'UI'
import { type ResponsibleHr } from 'types/vacancies'

import style from './Responsible.module.css'

type Props = {
  responsibleHr: ResponsibleHr
  vacancyID: string
}

const Responsible: FC<Props> = ({ responsibleHr, vacancyID }) => {
  const dispatch = useAppDispatch()
  const { hrEmails } = useAppSelector((state) => state.tasks)

  const [isOpen, setIsOpen] = useState(false)
  const clickRef = useRef<HTMLDivElement>(null)

  const onCLose = () => setIsOpen(false)
  useClickOutside(clickRef, onCLose)

  const onChangeIsOpenResponsibleState = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClickHR = (newHR: ResponsibleHr) => {
    const allDataByNewHR = hrEmails.find((hr) => hr === newHR)!
    dispatch(
      changeVacancyResponsibleHr({
        vacancyID,
        newResponsibleHr: allDataByNewHR,
      })
    )
  }

  const responsibleStyle = classNames({
    [style.dropDownActive]: isOpen,
    [style.dropDown]: !isOpen,
  })

  const selectResponsibleStyle = classNames({
    [style.selectHr]: isOpen,
    [style.hidden]: !isOpen,
  })

  return (
    <div className={style.responsible}>
      <Icon.ResponsibleHr />
      Ответственный:{' '}
      <div
        className={responsibleStyle}
        onClick={onChangeIsOpenResponsibleState}
      >
        <span>{responsibleHr.fio}</span>
        <button className={style.arrowBtn}>
          {isOpen ? <Icon.ArrowChewronUp /> : <Icon.ArrowChewronDown />}
        </button>
        <div ref={clickRef} className={selectResponsibleStyle}>
          {hrEmails.map((hr, index) => (
            <p
              key={index}
              className={style.hrDropDown}
              onClick={() => handleClickHR(hr)}
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

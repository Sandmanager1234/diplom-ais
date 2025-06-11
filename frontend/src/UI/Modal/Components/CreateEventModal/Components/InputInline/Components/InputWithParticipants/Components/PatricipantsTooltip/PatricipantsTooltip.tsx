import { FC } from 'react'

import { useAppSelector } from 'store'
import { selectLoadingSatus } from 'store/selectors/participentsSelector'
import { LoadingStatus } from 'store/data/models'

import { ISuggestionsDTO } from 'services/models'

import { INPUT_NAME } from '../../../../../../data/models'

import { PatricipantInfo } from './Components'

import style from './PatricipantsTooltip.module.css'

type Props = {
  name: INPUT_NAME
  participants: ISuggestionsDTO[]
  resetInputValue: (name: INPUT_NAME) => void
}

const PatricipantsTooltip: FC<Props> = ({
  participants,
  name,
  resetInputValue,
}) => {
  const loadingSatus = useAppSelector(selectLoadingSatus)

  const conditionalRendering = () => {
    if (loadingSatus === LoadingStatus.PENDING) {
      return <span className={style.loader} />
    }
    if (loadingSatus === LoadingStatus.FULFILLED && !!participants.length) {
      return (
        <>
          {participants.map((item) => (
            <PatricipantInfo
              resetInputValue={resetInputValue}
              name={name}
              key={item.valueId}
              participant={item}
            />
          ))}
        </>
      )
    }

    return <span className={style.notFound}>Ничего не найдено</span>
  }

  return <div className={style.tooltipWrapper}>{conditionalRendering()}</div>
}

export default PatricipantsTooltip

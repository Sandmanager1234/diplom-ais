import { FC, useMemo } from 'react'

import { Status } from 'components'
import { useAppDispatch } from 'store'

import { VacancyStatus as VacancyStatusType } from 'types/vacancies'
import {
  MAP_OPTION_TO_VACANCY_STATUS,
  MAP_STATUS_TO_VACANCY_COLOR,
  SORT_VACANCY_STATUS,
} from 'data/vacancyDataConstants'
import { changeVacancyStatus } from '../../store/slices/vacanciesSlice'
import { useLocation } from 'react-router-dom'
import { editVacancyStatus } from 'store/reducers/currentVacancyReducer'

type Props = {
  id: string
  option: VacancyStatusType
}

const VacancyStatus: FC<Props> = (props) => {
  const { id, option } = props
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const handleClickOption = (newOption: VacancyStatusType) => {
    const allDataByNewOption = SORT_VACANCY_STATUS.find(
      (s) => s.camelCaseName === newOption
    ) as typeof SORT_VACANCY_STATUS[number]

    const { name, camelCaseName } = allDataByNewOption

    pathname === '/vacancies'
      ? dispatch(changeVacancyStatus({ id, name, camelCaseName }))
      : dispatch(editVacancyStatus({ id, name, camelCaseName }))
  }

  const currentOption = useMemo(
    () => ({
      label: MAP_OPTION_TO_VACANCY_STATUS[option],
      value: option,
      color: MAP_STATUS_TO_VACANCY_COLOR[option],
    }),
    [option]
  )

  const options = useMemo(
    () =>
      SORT_VACANCY_STATUS.map((status) => ({
        label: status.title,
        value: status.camelCaseName,
        color: MAP_STATUS_TO_VACANCY_COLOR[status.camelCaseName],
      })),
    []
  )

  return (
    <Status<VacancyStatusType>
      options={options}
      currentOption={currentOption}
      onChange={handleClickOption}
    />
  )
}

export default VacancyStatus

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { ResumeStatus as ResumeStatusType } from 'types'
import { Status } from 'components'
import { useAppDispatch } from 'store'
import { changeApplicantStatus } from 'store/slices/resumeSlice'
import { editApplicantStatus } from 'store/reducers/applicantReducer'

import {
  MAP_OPTION_TO_RESUME_STATUS,
  MAP_STATUS_TO_RESUME_COLOR,
  SORT_RESUME_STATUS,
} from 'data/personalDataConstants'

type IProps = {
  id: string
  option: ResumeStatusType
  resumeId?: string
  openAlertModal: (value: 'sendOffer' | 'screening') => void
  updater: (state: any) => void
  setChosenOption: (chosenOption: 'sendOffer' | 'screening') => void
}

const ResumeStatus = (props: IProps) => {
  const { id, option, resumeId, openAlertModal, updater, setChosenOption } =
    props
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const handleClickOption = (newOption: ResumeStatusType) => {
    const allDataByNewOption = SORT_RESUME_STATUS.find(
      (s) => s.camelCaseName === newOption
    ) as (typeof SORT_RESUME_STATUS)[number]

    const { name, camelCaseName } = allDataByNewOption
    pathname === '/'
      ? dispatch(changeApplicantStatus({ id, name, resumeId, camelCaseName }))
      : dispatch(editApplicantStatus({ id, name, camelCaseName }))
    if (updater) updater(camelCaseName)
  }

  const handleClick = (newOption: ResumeStatusType) => {
    if (newOption === option) {
      return
    }
    setChosenOption(newOption)
    if (
      newOption === ResumeStatusType.Screening ||
      newOption === ResumeStatusType.SendOffer
    ) {
      openAlertModal(newOption)
    }
    if (newOption !== ResumeStatusType.SendOffer) {
      handleClickOption(newOption)
    }
  }

  const currentOption = useMemo(
    () => ({
      label: MAP_OPTION_TO_RESUME_STATUS[option],
      value: option,
      color: MAP_STATUS_TO_RESUME_COLOR[option],
    }),
    [option]
  )

  const options = useMemo(
    () =>
      SORT_RESUME_STATUS.map((status) => ({
        label: status.title,
        value: status.camelCaseName,
        color: MAP_STATUS_TO_RESUME_COLOR[status.camelCaseName],
      })),
    []
  )

  return (
    <>
      <Status<ResumeStatusType>
        options={options}
        currentOption={currentOption}
        onChange={handleClick}
      />
    </>
  )
}

export default ResumeStatus

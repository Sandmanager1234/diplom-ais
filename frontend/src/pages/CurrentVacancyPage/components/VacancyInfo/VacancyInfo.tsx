import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { useAppDispatch, useAppSelector } from 'store'

import { selectCurrentVacancy } from 'store/selectors/currentVacancySelector'
import { userApi } from 'services/userApi/userApi'
import { setProfileEmailHR } from 'store/slices/taskSlice'

import { InformationBlock } from './components'
import Candidates from '../Candidates/Candidates'

import style from './VacancyInfo.module.css'
import { Documents } from '../../../ProfileApplicant/components/personalData/components/Documents'
import { vacanciesApi } from '../../../../services/vacanciesApi/vacanciesApi'
import { AddVacancyDocumentsModal } from '../AddVacancyDocumentsModal'

const VacancyInfo = () => {
  const vacancy = useAppSelector(selectCurrentVacancy)
  const dispatch = useAppDispatch()
  const [openDocumentsModalGeneral, setOpenDocumentsModalGeneral] =
    useState(false)
  const mocked = [
    { id: 123, name: 'mocked' },
    { id: 222, name: 'mock' },
  ]
  let vacancyGrade = ''
  vacancy?.grades.map((item) => {
    vacancyGrade += item.grade + ' '
  })

  useEffect(() => {
    userApi.getHRs().then((res) => {
      dispatch(setProfileEmailHR(res))
    })
  }, [])
  if (!vacancy) return null

  const uploader = (file: any) => {
    return vacanciesApi.addDocumentToVacancy(vacancy.id, file)
  }

  return (
    <div className={style.vacancyInfo}>
      <InformationBlock>
        <InformationBlock.MainInfo
          vacancyID={vacancy.id}
          vacancyTitle={vacancy.position}
          grade={vacancyGrade}
          salary={vacancy.salary ? vacancy.salary.toLocaleString() : '-'}
          currency={vacancy.currency}
          option={vacancy.status}
        />
      </InformationBlock>
      <InformationBlock>
        <InformationBlock.LocationInfo
          customer={vacancy.customer}
          location={vacancy.locations}
        />
      </InformationBlock>

      <InformationBlock>
        <InformationBlock.AboutVacancyInfo
          responsibleHr={vacancy.responsibleHr}
          createAt={vacancy.timeCreate}
          vacancyID={vacancy.id}
        />
      </InformationBlock>
      <Candidates candidates={vacancy.applicants} />
      <Documents
        attachments={mocked}
        setActiveDocumentsModal={setOpenDocumentsModalGeneral}
      />
      {openDocumentsModalGeneral && (
        <AddVacancyDocumentsModal
          active={openDocumentsModalGeneral}
          setActive={setOpenDocumentsModalGeneral}
          uploader={uploader}
        />
      )}
    </div>
  )
}

export default VacancyInfo

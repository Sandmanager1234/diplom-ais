import { SetStateAction, useEffect, useState, Dispatch } from 'react'

import { useAppDispatch } from 'store'
import { ResumeStatus } from 'UI'

import { addGlossary } from 'store/slices/dictionariesSlice'
import { setProfileEmailHR } from 'store/slices/taskSlice'
import { Applicant } from 'services/resumesApi/models'
import { directoryApi } from 'services/directoryApi/directoryApi'
import { userApi } from 'services/userApi/userApi'

import { Photo } from './components/Photo'
import { About } from './components/About'
import { SocialNetworks } from './components/SocialNetworks'
import { Documents } from './components/Documents'
import { AboutResume } from './components/AboutResume'
import Vacancies from './components/Vacancies'

import styles from './PersonalData.module.css'
import MoreVertical from '../../../../UI/Icon/Components/MoreVertical/MoreVertical'

type PersonalDataProps = {
  setActiveDocumentsModal: Dispatch<SetStateAction<boolean>>
  applicant: Applicant
}

export const PersonalData = (props: PersonalDataProps) => {
  const { setActiveDocumentsModal, applicant } = props

  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    directoryApi.getDirectory('employment-type').then((res) => {
      dispatch(
        addGlossary({
          'employment-type': Object.fromEntries(
            res.map((n: { value: string; description: string }) => [
              n.value,
              n.description,
            ])
          ),
        })
      )
      directoryApi.getDirectory('country').then((res) => {
        dispatch(
          addGlossary({
            country: Object.fromEntries(
              res.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
        setLoading(true)
      })
    })
  }, [])

  useEffect(() => {
    userApi.getHRs().then((res) => {
      dispatch(setProfileEmailHR(res))
    })
  }, [])

  return (
    <div className={styles.personalData}>
      {applicant && isLoading && (
        <div>
          <div className={styles.moreVerticalWrap}>
            <MoreVertical />
          </div>
          <Photo
            photo={applicant.photo}
            name={applicant.name}
            surname={applicant.surname}
          />

          <About
            name={applicant.name}
            surname={applicant.surname}
            patronym={applicant.patronym}
            gender={applicant.gender}
            dateOfBirth={applicant.dateBirth}
            city={applicant.city}
            country={applicant.country}
            region={applicant.region}
          />
          <AboutResume
            responsibleHr={applicant.responsibleHr}
            createDate={applicant.timeCreate}
            applicantID={applicant.id}
          />
          <SocialNetworks contacts={applicant.contacts} />
          <Vacancies vacancies={applicant.vacancies} />
          <Documents
            attachments={applicant.attachments}
            setActiveDocumentsModal={setActiveDocumentsModal}
          />
        </div>
      )}
    </div>
  )
}

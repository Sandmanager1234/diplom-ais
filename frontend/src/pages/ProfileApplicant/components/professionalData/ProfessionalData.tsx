import { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store'
import { addGlossary } from 'store/slices/dictionariesSlice'

import { Applicant } from 'services/resumesApi/models'
import { directoryApi } from 'services/directoryApi/directoryApi'

import PositionSalary from './components/PositionSalary'
import Employments from './components/Employments'
import Skills from './components/Skills'
import EducationData from './components/Education'
import Languages from './components/Languages'
import Experience from './components/WorkExperience'
import Nationalities from './components/Nationalities'
import { Directories } from 'data/constants'

import styles from './ProfessionalData.module.css'

type Props = {
  applicant: Applicant
}

export const ProfessionalData: FC<Props> = ({ applicant }) => {
  const [loading, setLoading] = useState(false)

  const { glossary } = useAppSelector((state) => state.directories)
  const dispatch = useAppDispatch()
  useEffect(() => {
    directoryApi.getDirectory(Directories.Position).then((res) => {
      dispatch(
        addGlossary({
          position: Object.fromEntries(
            res.map((n: { value: string; description: string }) => [
              n.value,
              n.description,
            ])
          ),
        })
      )
      directoryApi.getDirectory(Directories.EducationType).then((res) => {
        dispatch(
          addGlossary({
            'education-type': Object.fromEntries(
              res.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
        directoryApi.getDirectory(Directories.Language).then((res) => {
          dispatch(
            addGlossary({
              language: Object.fromEntries(
                res.map((n: { value: string; description: string }) => [
                  n.value,
                  n.description,
                ])
              ),
            })
          )
          directoryApi.getDirectory(Directories.LanguageLevel).then((res) => {
            dispatch(
              addGlossary({
                'language-level': Object.fromEntries(
                  res.map((n: { value: string; description: string }) => [
                    n.value,
                    n.description,
                  ])
                ),
              })
            )
            directoryApi.getDirectory(Directories.Country).then((res) => {
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
        })
      })
    })
  }, [])

  return (
    <div>
      {applicant && loading && (
        <div className={styles.professionalData}>
          <PositionSalary
            glossary={glossary}
            position={applicant.position}
            salary={applicant.salary}
            currency={applicant.currency}
            grade={applicant.grade}
          />
          <Employments
            employments={applicant.employments}
            isBusinessTrip={applicant.isBusinessTrip}
            schedules={applicant.schedules}
            relocation={applicant.relocation}
            gender={applicant.gender}
            glossary={glossary}
          />
          <Nationalities
            nationalities={applicant.nationalities}
            workPermit={applicant.workPermit}
            glossary={glossary}
          />
          <div className={styles.attainments}>
            <Skills skills={applicant.skills} />
            <EducationData
              education={applicant.education}
              glossary={glossary}
            />
            <Languages languages={applicant.languages} glossary={glossary} />
          </div>
          <Experience
            summaryExperience={applicant.summaryExperience}
            experiences={applicant.experiences}
          />
        </div>
      )}
    </div>
  )
}

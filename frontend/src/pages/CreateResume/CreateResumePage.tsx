import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store'

import { clearFields, setFields } from 'store/slices/createResumeSlice'

import { resumesApi } from 'services/resumesApi/resumesApi'

import { contactsDataValidation } from 'utils/createResumeValidation/contactsDataValidation'
import { educationDataValidation } from 'utils/createResumeValidation/educationDataValidation'
import { experienceDataValidation } from 'utils/createResumeValidation/experinceDataValidation'
import { personalDataValidation } from 'utils/createResumeValidation/personalDataValidation'
import { specialitylDataValidation } from 'utils/createResumeValidation/specialityDataValidation'

import {
  AnotherInfo,
  Contacts,
  Documents,
  EducationWrap,
  Header,
  LanguageWrap,
  PersonalData,
  Speciality,
  WorkExperienceWrap,
} from './components'

import {
  CONTACTS_POSITION,
  INITIAL_STATE_OF_RESUME_CREATION,
} from './data/constants'

import styles from './CreateResumePage.module.css'
import { CreateResumeStep } from './data/models'

export const CreateResumePage = () => {
  const currentStep = useRef()

  const [resumeCreationSteps, setResumeCreationSteps] = useState<
    CreateResumeStep[]
  >(INITIAL_STATE_OF_RESUME_CREATION)

  const location = useLocation()

  const { id } = useParams()

  const { fields } = useAppSelector((state) => state.createResume)

  const [isLoaded, setLoading] = useState(false)

  const navigate = useNavigate()

  const [isResetPersonalData, setResetPersonalData] = useState(false)

  const dispatch = useAppDispatch()

  const isEdit = location.pathname.slice(0, 12) === '/edit-resume'

  useEffect(() => {
    if (isEdit) {
      setResumeCreationSteps((prev) =>
        prev.map((item) => ({ ...item, isVisited: true }))
      )
      dispatch(
        setFields({
          surname: '',
          name: '',
          patronym: '',
          contacts: [{}, {}, {}, {}, {}, {}, {}, {}],
          gender: '',
          dateBirth: '',
          country: '',
          region: '',
          city: '',
          nationalities: [],
          workPermit: true,
          position: '',
          grade: '',
          skills: [],
          experiences: [
            {
              id: 0,
              position: '',
              companyName: '',
              startDate: '',
              endDate: '',
              site: '',
              description: '',
            },
          ],
          salary: null,
          currency: 'RUB',
          education: [
            {
              id: 0,
              educationType: '',
              universityName: '',
              method: 'education',
              faculty: '',
              specialization: '',
              endYear: null,
            },
            {
              id: 1,
              educationType: '',
              universityName: '',
              method: 'course',
              faculty: '',
              specialization: '',
              endYear: null,
            },
            {
              id: 2,
              educationType: '',
              universityName: '',
              method: 'certificate',
              faculty: '',
              specialization: '',
              endYear: null,
            },
          ],
          languages: [
            {
              id: 0,
              language: '',
              level: '',
            },
          ],
          relocation: '',
          employments: [
            {
              employmentType: '',
            },
          ],
          attachments: [],
          isBusinessTrip: 'never',
        })
      )
      resumesApi
        .getApplicant(id)
        .then((res) => {
          const { data } = res
          if (
            data.education.filter((item) => item.method === 'education')
              .length === 0
          ) {
            data.education = [
              ...data.education,
              {
                id: data.education.length,
                educationType: '',
                universityName: '',
                method: 'education',
                faculty: '',
                specialization: '',
                endYear: null,
              },
            ]
          }
          const masContacts = [{}, {}, {}, {}, {}, {}, {}, {}]
          data.contacts.map((item: { type: string }) =>
            masContacts.splice(CONTACTS_POSITION[item.type], 1, item)
          )
          data.contacts = masContacts
          if (
            data.education.filter((item) => item.method === 'course').length ===
            0
          ) {
            data.education = [
              ...data.education,
              {
                id: data.education.length + 1,
                universityName: '',
                method: 'course',
                organization: '',
                specialization: '',
                endYear: null,
              },
            ]
          }
          if (
            data.education.filter((item) => item.method === 'certificate')
              .length === 0
          ) {
            data.education = [
              ...data.education,
              {
                id: data.education.length + 2,
                universityName: '',
                method: 'certificate',
                organization: '',
                specialization: '',
                endYear: null,
              },
            ]
          }
          if (data.experiences.length === 0) {
            data.experiences = [
              {
                id: 0,
                position: '',
                companyName: '',
                startDate: '',
                endDate: '',
                site: '',
                description: '',
              },
            ]
          }
          if (data.languages.length === 0) {
            data.languages = [
              {
                id: 0,
                language: '',
                level: '',
              },
            ]
          }
          dispatch(setFields(res))
          setLoading(true)
        })
        .catch(() => navigate('/'))
    } else {
      setResetPersonalData(true)
      dispatch(clearFields())
      setResumeCreationSteps(INITIAL_STATE_OF_RESUME_CREATION)
      setLoading(true)
    }
  }, [location])

  const activePage = resumeCreationSteps.filter((item) => item.isActive)[0].id

  useLayoutEffect(() => {
    if (isLoaded) {
      const activeStepClone = [
        personalDataValidation({ ...fields }),
        contactsDataValidation({ ...fields }),
        specialitylDataValidation({ ...fields }),
        experienceDataValidation({ ...fields }),
        educationDataValidation({ ...fields }),
      ]
      setResumeCreationSteps(
        resumeCreationSteps.map((item, index) =>
          index < 5
            ? {
                ...item,
                isError: !activeStepClone[index],
              }
            : { ...item, isError: false }
        )
      )
    }
  }, [fields, activePage, currentStep])

  return (
    <>
      <div className={styles.wrapTest}>
        <Header
          activeStep={resumeCreationSteps}
          setActiveStep={setResumeCreationSteps}
          currentRef={currentStep}
        />
        {isLoaded && (
          <div>
            {resumeCreationSteps[0].isActive && (
              <PersonalData
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
                isResetPersonalData={isResetPersonalData}
                setResetPersonalData={setResetPersonalData}
                isEdit={isEdit}
              />
            )}
            {resumeCreationSteps[1].isActive && (
              <Contacts
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
                isEdit={isEdit}
              />
            )}
            {resumeCreationSteps[2].isActive && (
              <Speciality
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
                isEdit={isEdit}
              />
            )}
            {resumeCreationSteps[3].isActive && (
              <WorkExperienceWrap
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
                isEdit={isEdit}
              />
            )}
            {resumeCreationSteps[4].isActive && (
              <EducationWrap
                isEdit={isEdit}
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
              />
            )}
            {resumeCreationSteps[5].isActive && (
              <LanguageWrap
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
                currentRef={currentStep}
              />
            )}
            {resumeCreationSteps[6].isActive && (
              <AnotherInfo
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
              />
            )}
            {resumeCreationSteps[7].isActive && (
              <Documents
                setActiveStep={setResumeCreationSteps}
                activeStep={resumeCreationSteps}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

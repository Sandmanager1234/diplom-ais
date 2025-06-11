import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store'
import { BtnSaveResume } from 'UI'

import { addFieldExperiences } from 'store/slices/createResumeSlice'
import { CreateResumeStep } from '../../data/models'
import { WorkExperience } from './WorkExperience'
import styles from './WorkExperienceWrap.module.css'

interface IWorkExperience {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
  currentRef: any
  isEdit: boolean
}

export const WorkExperienceWrap: FC<IWorkExperience> = (props) => {
  const { activeStep, setActiveStep, currentRef, isEdit } = props

  const { fields } = useAppSelector((state) => state.createResume)

  const dispatch = useAppDispatch()

  const { id } = useParams()

  const [generalExpString, setGeneralExpString] = useState('')

  const [generalExperience, setGeneralExperience] = useState([
    { id: 0, experienceMonth: 0, isErrorEndMonth: false },
  ])

  const lastWorkExperience = fields.experiences[fields.experiences.length - 1]

  const isEndError =
    generalExperience.filter((item) => item.isErrorEndMonth).length > 0

  function calculateTotalExperience(dates) {
    const sortDates = dates
      .filter((el) => el.endDate && el.startDate)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    let totalExperience = 0
    let previousEndDate = null
    for (let i = 0; i < sortDates.length; i++) {
      const { startDate, endDate } = sortDates[i]
      if (previousEndDate && new Date(startDate) < new Date(previousEndDate)) {
        continue
      }
      const experience = new Date(endDate) - new Date(startDate)
      totalExperience += experience
      previousEndDate = endDate
    }
    const totalMonths = Math.floor(totalExperience / (1000 * 60 * 60 * 24 * 30))
    return totalMonths
  }

  const formatterYear = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  })
  const formatterMonth = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'month',
    unitDisplay: 'long',
  })

  useEffect(() => {
    const diffMonths = calculateTotalExperience(fields.experiences)
    const years = (diffMonths / 12) | 0
    const leftMonth = diffMonths % 12 | 0
    setGeneralExpString(
      `${years > 0 ? formatterYear.format(years) : ''} ${
        leftMonth > 0 ? formatterMonth.format(leftMonth) : ''
      }`
    )
  }, [generalExperience])

  const [isValid, setValid] = useState<boolean>(
    currentRef.current?.checkValidity()
  )

  useEffect(() => {
    setValid(currentRef.current?.checkValidity())
  }, [fields, currentRef])

  return (
    <form
      className={styles.formStyle}
      ref={currentRef}
      onSubmit={() => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
        setActiveStep(
          activeStep.map((item) =>
            item.id === 4
              ? {
                  ...item,
                  isActive: true,
                  isVisited: true,
                }
              : { ...item, isActive: false }
          )
        )
      }}
    >
      <div className={styles.wrapWorkExperience}>
        <div className={styles.title}>Опыт работы</div>
        {fields.experiences.map((experience, index) => (
          <WorkExperience
            key={experience.id}
            id={experience.id}
            experienceState={experience}
            setGeneralExperience={setGeneralExperience}
            generalExperience={generalExperience}
            isLastExperience={
              experience.id ===
              fields.experiences[fields.experiences.length - 1].id
            }
            isEdit={isEdit}
            index={index}
          />
        ))}
        <button
          className={styles.btnAddField}
          type='button'
          disabled={
            lastWorkExperience.position === '' ||
            lastWorkExperience.companyName === ''
          }
          onClick={() => {
            setGeneralExperience([
              ...generalExperience,
              {
                id:
                  generalExperience.length !== 0
                    ? generalExperience[generalExperience.length - 1].id + 1
                    : 0,
                experienceMonth: 0,
                isErrorEndMonth: false,
              },
            ])
            dispatch(
              addFieldExperiences([
                ...fields.experiences,
                {
                  id:
                    fields.experiences.length !== 0
                      ? fields.experiences[fields.experiences.length - 1].id + 1
                      : 0,
                  position: '',
                  companyName: '',
                  startDate: '',
                  endDate: '',
                  site: '',
                  description: '',
                },
              ])
            )
          }}
        >
          Указать еще одно место работы
        </button>
        <div className={styles.wrapExperience}>
          <span className={styles.subTitle}>Общий стаж</span>
          <div className={styles.experience}>
            {generalExpString ||
              'Укажите опыт работы, данные автоматически обновятся'}
          </div>
        </div>
        <div className={styles.wrapBtn}>
          <div>
            <button
              className={styles.btnBack}
              type={isValid ? 'button' : 'submit'}
              onClick={() => {
                setActiveStep(
                  activeStep.map((item) =>
                    item.id === 2
                      ? {
                          ...item,
                          isActive: true,
                          isVisited: true,
                        }
                      : { ...item, isActive: false }
                  )
                )
              }}
            >
              Назад
            </button>
            <button className={styles.btnContinue} disabled={isEndError}>
              Продолжить
            </button>
          </div>
          <BtnSaveResume
            disabled={
              !currentRef.current?.checkValidity() ||
              !!activeStep.filter((item) => item.isError).length ||
              isEndError
            }
          />
        </div>
      </div>
    </form>
  )
}

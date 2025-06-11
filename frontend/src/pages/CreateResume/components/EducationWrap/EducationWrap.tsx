import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BtnSaveResume } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { addGlossary, dictionariesSlice } from 'store/slices/dictionariesSlice'
import { addFieldEducation } from 'store/slices/createResumeSlice'
import { Education } from './Education'
import { Course } from './Course'
import { educationValidity } from '../../../../utils/createResumeValidation/educationValidity'
import { courseValidity } from '../../../../utils/createResumeValidation/courseValidity'
import { directoryApi } from '../../../../services/directoryApi/directoryApi'
import { CreateResumeStep } from '../../data/models'
import styles from './EducationWrap.module.css'

interface IEducation {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
  currentRef: any
  isEdit: boolean
}

export const EducationWrap: React.FC<IEducation> = (props) => {
  const { activeStep, setActiveStep, currentRef, isEdit } = props

  const { fields } = useAppSelector((state) => state.createResume)
  const { id } = useParams()

  const [method, setMethod] = useState('education')

  const dispatch = useAppDispatch()
  const { addDictionary } = dictionariesSlice.actions

  const lastEducation = fields.education.filter(
    (item) => item.method === method
  )[fields.education.filter((item) => item.method === method).length - 1]

  useEffect(() => {
    directoryApi.getDirectory('education-type').then((res) => {
      dispatch(addDictionary({ name: 'education-type', value: res }))
    })
    directoryApi.getDirectory('language').then((res) => {
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
    })
  }, [])

  const [isValid, setValid] = useState<boolean>(
    currentRef.current?.checkValidity()
  )

  const isEducationValidity = fields.education
    .filter((item) => item.method === 'education')
    .map((item) => educationValidity(item))
    .includes(true)
  const isCourseValidity = fields.education
    .filter((item) => item.method === 'course')
    .map((item) => courseValidity(item))
    .includes(true)
  const isCertificateValidity = fields.education
    .filter((item) => item.method === 'certificate')
    .map((item) => courseValidity(item))
    .includes(true)

  useEffect(() => {
    setValid(currentRef.current?.checkValidity())
  }, [activeStep, fields, currentRef])

  return (
    <form
      className={styles.formStyle}
      ref={currentRef}
      onSubmit={() => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
        setActiveStep(
          activeStep.map((item) =>
            item.id === 5
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
      <div className={styles.wrapEducation}>
        <div className={styles.title}>Образование</div>
        <div className={styles.navEducation}>
          <button
            type='button'
            onClick={() => setMethod('education')}
            className={
              isEducationValidity && method === 'education'
                ? styles.btnMethodErrorActive
                : isEducationValidity
                ? styles.btnErrorActive
                : method === 'education'
                ? styles.btnMethodActive
                : styles.btnMethod
            }
          >
            Образование
          </button>
          <button
            type='button'
            onClick={() => setMethod('course')}
            className={
              isCourseValidity && method === 'course'
                ? styles.btnMethodErrorActive
                : isCourseValidity
                ? styles.btnErrorActive
                : method === 'course'
                ? styles.btnMethodActive
                : styles.btnMethod
            }
          >
            Повышение квалификации, курсы
          </button>
          <button
            type='button'
            onClick={() => setMethod('certificate')}
            className={
              isCertificateValidity && method === 'certificate'
                ? styles.btnMethodErrorActive
                : isCertificateValidity
                ? styles.btnErrorActive
                : method === 'certificate'
                ? styles.btnMethodActive
                : styles.btnMethod
            }
          >
            Электронные сертификаты
          </button>
        </div>
        {method === 'education'
          ? fields.education
              .filter((item) => item.method === 'education')
              .map((education) => (
                <Education
                  key={education.id}
                  id={education.id}
                  educationState={education}
                  isLastField={true}
                  isEdit={isEdit}
                />
              ))
          : null}
        {method === 'course'
          ? fields.education
              .filter((item) => item.method === 'course')
              .map((education) => (
                <Course
                  key={education.id}
                  id={education.id}
                  educationState={education}
                  isLastField={true}
                  isEdit={isEdit}
                />
              ))
          : null}
        {method === 'certificate'
          ? fields.education
              .filter((item) => item.method === 'certificate')
              .map((education) => (
                <Course
                  key={education.id}
                  id={education.id}
                  educationState={education}
                  isLastField={true}
                  isEdit={isEdit}
                />
              ))
          : null}
        <button
          className={styles.btnAddField}
          type='button'
          disabled={
            lastEducation.educationType === '' ||
            lastEducation.specialization === ''
          }
          onClick={() =>
            dispatch(
              addFieldEducation([
                ...fields.education,
                {
                  id:
                    fields.education.length !== 0
                      ? fields.education[fields.education.length - 1].id + 1
                      : 0,
                  educationType: '',
                  universityName: '',
                  method: method,
                  faculty: '',
                  specialization: '',
                  endYear: null,
                },
              ])
            )
          }
        >
          Указать еще одно место обучения
        </button>
      </div>
      <div className={styles.wrapBtn}>
        <div>
          <button
            type={isValid ? 'button' : 'submit'}
            className={styles.btnBack}
            onClick={() => {
              setActiveStep(
                activeStep.map((item) =>
                  item.id === 3
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
          <button
            type='submit'
            disabled={
              !currentRef.current?.checkValidity() ||
              !!activeStep.filter((item) => item.isError).length
            }
            className={styles.btnContinue}
          >
            Продолжить
          </button>
        </div>
        <BtnSaveResume
          disabled={
            !currentRef.current?.checkValidity() ||
            !!activeStep.filter((item) => item.isError).length
          }
        />
      </div>
    </form>
  )
}

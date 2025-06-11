import { isArray } from 'lodash'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { Autocomplete, BtnSaveResume, Dropdown, Icon, Input } from 'UI'

import {
  addField,
  setPositions,
  setSkillsList,
} from 'store/slices/createResumeSlice'
import { CreateResumeStep } from '../../data/models'
import styles from './Speciality.module.css'

interface IProps {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
  currentRef: any
  isEdit: boolean
}

export const Speciality = (props: IProps) => {
  const { setActiveStep, activeStep, currentRef, isEdit } = props

  const { mas, glossary } = useAppSelector((state) => state.directories)
  const { fields } = useAppSelector((state) => state.createResume)

  const dispatch = useAppDispatch()

  const [currency, setCurrency] = useState(fields.currency)
  const [grade, setGrade] = useState(fields.grade)
  const [skill, setSkill] = useState<string>()
  const [skills, setSkills] = useState<{ id: number; skillName: string }[]>([])
 const [position, setPosition] = useState(fields.position)


  const [positionFocus, setPositionFocus] = useState(false)
  const [isValid, setValid] = useState<boolean>(
    currentRef.current?.checkValidity()
  )

  useEffect(() => {
    dispatch(addField({ currency: currency, grade: grade }))
  }, [grade, currency, skills])


  useEffect(() => {
    dispatch(setPositions(position))
  }, [position])



  useEffect(() => {
    const masSkills = fields.skills.length
      ? fields.skills.map((item: { skillName: string }) =>
          item.skillName.toLowerCase()
        )
      : []
    if (
      skill &&
      !masSkills.includes(skill.toLowerCase()) &&
      skill.trim().length !== 0
    ) {
      dispatch(
        setSkillsList([
          ...fields.skills,
          {
            id: fields.skills ? fields.skills.length : 0,
            skillName: skill.trim(),
          },
        ])
      )
    }
  }, [skill])

  useEffect(() => {
    setValid(currentRef.current?.checkValidity())
  }, [activeStep, fields, currentRef])

  return (
    <form
      className={styles.formStyle}
      ref={currentRef}
      onSubmit={(e) => {
        e.preventDefault()
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
        if (fields.position) {
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
        }
      }}
    >
      <div className={styles.wrapSpeciality}>
        <div
          className={styles.positionField}
          onBlur={() => setPositionFocus(true)}
        >
          <Autocomplete
            dictionary={isArray(mas.position) ? mas.position : []}
            isAutoClean={false}
            onChange={setPosition}
            isOnlyDictionaryValue={true}
            isFocus={isEdit}
            title='Желаемая должность*'
            required={true}
            reset={false}
            errorField='Желаемая должность'
            defaultValue={mas.position.find(el => el.value === position)?.description || ''}
          />
        </div>
        <Dropdown
          onChange={setGrade}
          style='defaultDropdown'
          title='Грейд'
          dropItems={isArray(mas.grade) ? mas.grade : []}
          name='grade'
          defaultValue={fields.grade}
        />
        <Autocomplete
          isAutoClean={true}
          title='Ключевые навыки'
          onChange={setSkill}
          dictionary={isArray(mas.skills) ? mas.skills : []}
          isUniqueValue={false}
        />
        {fields.skills.length !== 0 && (
          <div className={styles.wrapSkills}>
            {fields.skills.map((skill: { id: number; skillName: string }) => (
              <div key={skill.id} className={styles.skill}>
                <div className={styles.skillName}>{skill.skillName}</div>
                <button
                  className={styles.btnDelete}
                  type='button'
                  onClick={() => {
                    dispatch(
                      setSkillsList(
                        fields.skills.filter(
                          (item: { id: number }) => item.id !== skill.id
                        )
                      )
                    )
                  }}
                ></button>
                <Icon.XMarkCircle />
              </div>
            ))}
          </div>
        )}
        <div className={styles.wrapSalary}>
          <Input
            isFocus={isEdit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value !== '') {
                dispatch(addField({ salary: Number(e.target.value) }))
              } else {
                dispatch(addField({ salary: null }))
              }
            }}
            onKeyDown={(e) =>
              ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
            }
            inputType='salaryInput'
            title='Зарплата'
            value={fields['salary'] == null ? '' : fields['salary']}
            name='salary'
            type='number'
            min={0}
            max={100000000}
          />
          <Dropdown
            onChange={setCurrency}
            dropItems={isArray(mas.currency) ? mas.currency : []}
            title=' '
            style='currencyDropdown'
            defaultValue={fields.currency}
            name='currency'
          />
        </div>
        <div className={styles.wrapBtn}>
          <div>
            <button
              type={isValid ? 'button' : 'submit'}
              className={styles.btnBack}
              onClick={() => {
                setActiveStep(
                  activeStep.map((item) =>
                    item.id === 1
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
            <button className={styles.btnContinue} type='submit'>
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
      </div>
    </form>
  )
}

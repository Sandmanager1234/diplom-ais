import React from 'react'

import {Input} from "UI"

import { useAppDispatch, useAppSelector } from 'store'

import { setEducation } from '../../../../../store/slices/createResumeSlice'

import styles from '../Education/Education.module.css'

interface ICourse {
  id: number;
  educationState: {
    universityName: string
    specialization: string
    organization: string
    endYear: number
  };
  isEdit: boolean
}

export const Course: React.FC<ICourse> = (props) => {

  const { id, educationState, isEdit } = props

  const dispatch = useAppDispatch()

  const { fields } = useAppSelector(state => state.createResume)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEducation(fields.education.map((educate) => educate.id === id ?
      {
        ...educate, [e.target.name]: e.target.value,
      } : educate),
    ))
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapEducation}>
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
          name={'universityName'}
          inputType={'defaultInput'}
          title={'Учебное заведение'}
          defaultValue={educationState.universityName}
          pattern={'^[^\\s]+(\\s+[^\\s]+)*$'}
          required={(educationState.organization !== '' && educationState.organization != null) || (educationState.universityName !== '' && educationState.universityName != null) || (educationState.endYear != null && educationState.endYear !== '')}
          error={educationState.universityName?.length > 0 ? 'Введено недопустимое значения поля "Учебное заведение".' : 'Поле "Учебное заведение" обязательно для заполнения. '}
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
          name={'organization'}
          inputType={'defaultInput'}
          title={'Проводившая организация'}
          pattern={'^[^\\s]+(\\s+[^\\s]+)*$'}
          required={(educationState.organization !== '' && educationState.organization != null) || (educationState.universityName !== '' && educationState.universityName != null) || (educationState.endYear != null && educationState.endYear !== '')}
          defaultValue={educationState.organization}
          error={educationState.organization?.length > 0 ? 'Введено недопустимое значения поля "Проводившая организация".' : 'Поле "Проводившая организация" обязательно для заполнения.'}
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
          name={'specialization'}
          pattern={'^[^\\s]+(\\s+[^\\s]+)*$'}
          inputType={'defaultInput'}
          title={'Специализация'}
          defaultValue={educationState.specialization}
          error={'Введено недопустимое значения поля "Специализация".'}
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
          name={'endYear'}
          type={'number'}
          min={1910}
          max={new Date().getFullYear() + 10}
          inputType={'mediumInput'}
          title={'Год окончания'}
          required={(educationState.organization !== '' && educationState.organization != null) || (educationState.universityName !== '' && educationState.universityName != null) || (educationState.endYear != null && educationState.endYear !== '')}
          defaultValue={educationState.endYear}
          error={educationState.endYear != null ? 'Введено недопустимое значение поля "Год окончания"' : 'Поле "Год окончания" обязательно для заполнения.'}
        />
        <div className={styles.tipEndYear}>
          Если учитесь в настоящее время — укажите год предполагаемого окончания
        </div>
      </div>
    </div>
  )
}
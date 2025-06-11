import React, { useEffect, useState } from 'react'

import {Dropdown, Icon, Input} from "UI";
import { useAppDispatch, useAppSelector } from 'store'

import { addFieldEducation, setEducation } from '../../../../../store/slices/createResumeSlice'

import styles from './Education.module.css'

interface IEducation {
  id: number
  educationState: {
    educationType: string,
    universityName: string,
    faculty: string,
    specialization: string,
    endYear: number,
  }
  isLastField: boolean
  isEdit: boolean
}

export const Education: React.FC<IEducation> = ({ id, educationState, isLastField, isEdit }) => {

  const { mas } = useAppSelector((state) => state.directories)
  const { fields } = useAppSelector((state) => state.createResume)

  const dispatch = useAppDispatch()

  const [levelEducation, setLevelEducation] = useState(educationState.educationType)
  const [isCardActive, setCardActive] = useState(!isLastField)

  // useEffect(() => {
  //     setCardActive(!isLastField)
  // }, [isLastField,])

  const currentObject = fields.education.filter(item => item.id === id)

  useEffect(() => {
    dispatch(setEducation(fields.education.map((educate) => educate.id === id ?
      {
        ...educate, educationType: levelEducation,
      } : educate),
    ))


  }, [levelEducation])


  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEducation(fields.education.map((educate) => educate.id === id ?
      {
        ...educate, [e.target.name]: e.target.value,
      } : educate),
    ))

  }
  return (
    <div className={styles.wrap}>
      {!isCardActive ?
        <div className={styles.wrapEducation}>
          <Dropdown
            isFocus={isEdit}
            onChange={setLevelEducation}
            style={'defaultDropdown'}
            title={'Уровень образования'}
            dropItems={mas['education-type']}
            defaultValue={levelEducation !== '' ? levelEducation : 'Не выбрано'}
            required={educationState.educationType !== '' || educationState.endYear != null || educationState.universityName !== '' || educationState.faculty !== ''}
            error={'Поле "Уровень образования" обязательно для заполнения.'}
          />
          <Input
            isFocus={isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            name={'universityName'}
            type={'text'}
            inputType={'defaultInput'}
            title={'Учебное заведение'}
            defaultValue={educationState.universityName}
            pattern={'^[^\\s]+(\\s.*)?$'}
            error={currentObject[0].universityName === '' || currentObject[0].universityName == undefined ? 'Поле "Учебное заведение" обязательно для заполнения.' : 'Введено недопустимое значение поля "Учебное заведение"'}
            required={!(currentObject[0].educationType === 'secondary' ||
              currentObject[0].educationType === 'secondary_specialized' || currentObject[0].educationType === '')}
          />
          <Input
            isFocus={isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            name={'faculty'}
            inputType={'defaultInput'}
            error={'Введено недопустимое значение поля "Факультет"'}
            title={'Факультет'}
            pattern={'^[^\\s]+(\\s.*)?$'}
            defaultValue={educationState.faculty}
          />
          <Input
            isFocus={isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            name={'specialization'}
            inputType={'defaultInput'}
            title={'Специализация'}
            pattern={'^[^\\s]+(\\s.*)?$'}
            error={'Введено недопустимое значение поля "Специализация"'}
            defaultValue={educationState.specialization}
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
            defaultValue={educationState.endYear}
            error={currentObject[0].endYear === '' || currentObject[0].endYear == undefined ? 'Поле "Год окончания" обязательно для заполнения.' : 'Введено недопустимое значение поля "Год окончания"'}
            required={!(currentObject[0].educationType === 'secondary' ||
              currentObject[0].educationType === 'secondary_specialized' || currentObject[0].educationType === '')}
          />
          <div className={styles.tipEndYear}>
            Если учитесь в настоящее время — укажите год предполагаемого окончания
          </div>
        </div> :
        <div className={styles.cardWrap}>
          <div
            className={styles.navCard}>{educationState.educationType ? educationState.educationType : 'Не указано'}
            <div>
              <button className={styles.btnEdit} onClick={() => setCardActive(false)}><Icon.Edit /></button>
              <button className={styles.btnEdit}
                      onClick={() => dispatch(addFieldEducation(fields.education.filter(educate => educate.id !== id)))}>
                <Icon.Trash /></button>
            </div>
          </div>
          <div className={styles.yearEducate}>{educationState.endYear}</div>
          <div className={styles.universityName}>{educationState.universityName}</div>
          <div className={styles.faculty}>{educationState.faculty}, {educationState.specialization}</div>
        </div>
      }
    </div>
  )
}

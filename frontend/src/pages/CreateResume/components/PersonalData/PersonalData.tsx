import { isArray } from 'lodash'
import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'

import { Autocomplete, BtnSaveResume, Dropdown, Input } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import {
  addField,
  setFieldRegion,
  setNationality,
  setWorkPermit,
} from 'store/slices/createResumeSlice'
import { addGlossary, dictionariesSlice } from 'store/slices/dictionariesSlice'
import { directoryApi } from '../../../../services/directoryApi/directoryApi'
import {
  checkCity,
  checkCountry,
  checkName,
  checkPatronomic,
  checkRegion,
  checkSurname
} from '../../../../store/slices/resumeValidationSlice'

import { CreateResumeStep } from '../../data/models'

import styles from './PersonalData.module.css'

interface IPersonalData {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
  currentRef: any
  setResetPersonalData: Dispatch<boolean>
  isResetPersonalData: boolean
  isEdit: boolean
}

export const PersonalData: FC<IPersonalData> = (props) => {
  const {
    setActiveStep,
    activeStep,
    currentRef,
    setResetPersonalData,
    isResetPersonalData,
    isEdit,
  } = props

  const { mas } = useAppSelector((state) => state.directories)
  const { fields } = useAppSelector((state) => state.createResume)
  const [dateBirthInput, setDateBirthInput] = useState<string>(
    fields?.dateBirth ? new Date(fields.dateBirth).toLocaleString('ru-RU') : ''
  )

  const dispatch = useAppDispatch()
  const { addDictionary } = dictionariesSlice.actions

  useEffect(() => {
    directoryApi.getDirectory('position').then(({ data }) => {
      if (data) {
        dispatch(
          addGlossary({
            position: Object.fromEntries(
              data.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
      }
    })
    directoryApi.getDirectory('region').then(({ data }) => {
      if (data) {
        dispatch(
          addGlossary({
            region: Object.fromEntries(
              data?.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
      }
    })
    directoryApi.getDirectory('city').then(({ data }) => {
      if (data) {
        dispatch(
          addGlossary({
            city: Object.fromEntries(
              data?.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
      }
    })
    directoryApi.getDirectory('gender').then((res) => {
      dispatch(addDictionary({ name: 'gender', value: res }))
    })
    directoryApi.getDirectory('country').then((res) => {
      dispatch(addDictionary({ name: 'country', value: res }))
    })
    directoryApi.getDirectory('region').then((res) => {
      dispatch(addDictionary({ name: 'region', value: res }))
    })
    directoryApi.getDirectory('city').then((res) => {
      dispatch(addDictionary({ name: 'city', value: res }))
    })
    directoryApi.getDirectory('currency').then((res) => {
      dispatch(addDictionary({ name: 'currency', value: res }))
    })
    directoryApi.getDirectory('grade').then((res) => {
      dispatch(addDictionary({ name: 'grade', value: res }))
    })
    directoryApi.getDirectory('position').then((res) => {
      dispatch(addDictionary({ name: 'position', value: res }))
    })
    directoryApi.getDirectory('skill').then((res) => {
      dispatch(addDictionary({ name: 'skills', value: res }))
    })
    directoryApi.getDirectory('language').then((res) => {
      dispatch(addDictionary({ name: 'language', value: res }))
    })
    directoryApi.getDirectory('language').then((res) => {
      if (res.data) {
        dispatch(
          addGlossary({
            language: Object.fromEntries(
              res.data.map((n: { value: string; description: string }) => [
                n.value,
                n.description,
              ])
            ),
          })
        )
      }
    })
  }, [])

  const [gender, setGender] = useState(fields.gender)
  const [region, setRegion] = useState({ id: '', value: fields.region })
  const [city, setCity] = useState(fields.city)
  const [country, setCountry] = useState({
    id:
      fields.country === 'Russia' ? '31bbebb7-a1a1-4793-84dd-5d6749784f9a' : '',
    value: fields.country,
  })
  const [nationalitys, setNationalitys] = useState<string[]>(
    fields.nationalities?.map((item) => item && item.nationality) || []
  )

  function handleChangeCountry(e) {
    setCountry(e)
    dispatch(
      addField({
        country: dispatch(checkCountry(e.value)).payload,
      })
    )
  }

  function handleChangeRegion(e){
    setRegion(e)
    dispatch(
      addField({
        region: dispatch(checkRegion(e.value)).payload,
      })
    )
  }

  function handleChangeCity(e){
    setCity(e)
    dispatch(
      addField({city: dispatch(checkCity(e.value)).payload})
    )
  }

  function ageCount() {
    if (dateBirthInput !== '' && dateBirthInput.length === 10) {
      const Year = new Intl.NumberFormat('ru', {
        style: 'unit',
        unit: 'year',
        unitDisplay: 'long',
      })
      const ageDifMs =
        Date.now() - new Date(dateBirthInput.split('.').reverse()).getTime()
      const ageDate = new Date(ageDifMs)
      return Year.format(Math.abs(ageDate.getUTCFullYear() - 1970))
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (country.id !== '' && country.id != undefined) {
      directoryApi
        .getRegions(country.id)
        .then(({ data }) =>
          dispatch(addDictionary({ name: 'region', value: data }))
        )
      directoryApi.getRegions(country.id).then(({ data }) =>
        dispatch(
          addField({
            gender: gender,
            country: country.value,
            city: data.length === 0 ? '' : city,
            region: data.length === 0 ? '' : region.value,
          })
        )
      )
    }
    if (region.id !== '' && region.id != undefined) {
      // directoryApi.getCities(region.id).then((res) =>
      directoryApi.getCities(`regionId=${region.id}`).then((res) =>
        dispatch(
          addDictionary({
            name: 'city',
            value: res,
          })
        )
      )
    }
    dispatch(addField({ city: city !== '' ? city : '' }))
    dispatch(setFieldRegion(region.value))
    dispatch(addField({ gender: gender }))
    if (nationalitys.includes('Russia') && nationalitys.length !== 0) {
      dispatch(setWorkPermit(true))
    }
    if (nationalitys.length !== 0) {
      dispatch(
        setNationality(
          nationalitys.map((item) => item && { nationality: item })
        )
      )
    } else {
      dispatch(setNationality([]))
      dispatch(setWorkPermit(''))
    }
    if (isResetPersonalData) {
      setDateBirthInput('')
    }
    dateBirthInput &&
      !isResetPersonalData &&
      dispatch(
        addField({
          dateBirth: new Date(
            dateBirthInput.slice(6, 10),
            dateBirthInput.slice(3, 5) - 1,
            dateBirthInput.slice(0, 2)
          ).toLocaleDateString('sv-SE'),
        })
      )
  }, [
    gender,
    country,
    nationalitys,
    region,
    city,
    dateBirthInput,
    isResetPersonalData,
  ])

  return (
    <form
      className={styles.formStyle}
      ref={currentRef}
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
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
      <div className={styles.wrapContainer}>
        <div className={styles.title}>Личные данные</div>
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(
              addField({
                surname: dispatch(checkSurname(e.target.value)).payload,
              })
            )  
          }
          name={'surname'}
          inputType={'defaultInput'}
          value={fields['surname']}
          title={'Фамилия *'}
          required={true}
          pattern={'[A-Za-zА-Яа-яЁё]{2,}'}
          error={
            fields['surname'].length
              ? 'Введено недопустимое значения поля "Фамилия".'
              : 'Поле "Фамилия" обязательно для заполнения.'
          }
        />
        <Input
          isFocus={isEdit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(
              addField({ name: dispatch(checkName(e.target.value)).payload })
            )
          }
          name={'name'}
          inputType={'defaultInput'}
          value={fields['name']}
          title={'Имя *'}
          required={true}
          pattern={'[A-Za-zА-Яа-яЁё]{2,}'}
          error={
            fields['name'].length
              ? 'Введено недопустимое значение поля "Имя".'
              : 'Поле "Имя" обязательно для заполнения.'
          }
        />
        <Input
          isFocus={isEdit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(
              addField({
                patronym: dispatch(checkPatronomic(e.target.value)).payload,
              })
            )
          }
          name={'patronym'}
          inputType={'defaultInput'}
          value={fields['patronym']}
          title={'Отчество'}
          pattern={'[A-Za-zА-Яа-яЁё]{2,}'}
          error={'Введено недопустимое значение поля "Отчество"'}
        />
        <Dropdown
          onChange={setGender}
          name={'gender'}
          style={'defaultDropdown'}
          dropItems={isArray(mas.gender) ? mas.gender : []}
          title={'Пол'}
          defaultValue={fields.gender}
        />
        <div
          className={styles.dib}
          onBlur={() => {
            if (dateBirthInput.length < 10) {
              setDateBirthInput('')
            }
          }}
        >
          <Input
            placeholder={'ДД.ММ.ГГГГ'}
            inputType={'mediumInput'}
            title={'Дата рождения'}
            defaultValue={fields['dateBirth'] ? fields['dateBirth'] : ''}
            value={dateBirthInput}
            masked={{
              mask: Date,
              min: new Date(1910, 10, 10),
              max: new Date(new Date().getFullYear() - 17, 0, 1),
              onAccept: (e) => setDateBirthInput(e),
            }}
            error={'Ваш возраст не должен быть младше 18 старше 110 лет.'}
          />
          <div className={styles.inputMedium}>
            <span className={styles.titleInput}>Возраст</span>
            <input
              className={styles.inputStyle}
              disabled={true}
              value={dateBirthInput == null ? '' : ageCount()}
              type='text'
              readOnly={true}
            />
          </div>
        </div>
        <Dropdown
          onChange={handleChangeCountry}
          name={'country'}
          dropItems={isArray(mas.country) ? mas.country : []}
          style={'defaultDropdown'}
          title={'Страна *'}
          defaultValue={fields.country}
          returnId={true}
          required={true}
          error={'Поле "Страна" обязательно для заполнения.'}
        />
        <Autocomplete
          setReset={setResetPersonalData}
          reset={isResetPersonalData}
          title={'Регион *'}
          onChange={handleChangeRegion}
          isAutoClean={false}
          isUniqueValue={false}
          dictionary={isArray(mas.region) ? mas.region : []}
          defaultValue={fields.region}
          returnId={true}
          required={true}
          errorField={'Регион'}
        />
        <Autocomplete
          reset={isResetPersonalData}
          setReset={setResetPersonalData}
          title={'Город *'}
          onChange={handleChangeCity}
          isAutoClean={false}
          dictionary={isArray(mas.city) ? mas.city : []}
          defaultValue={fields.city}
          required={true}
          errorField={'Город'}
        />
        <Dropdown
          onChange={setNationalitys}
          dropItems={isArray(mas.country) ? mas.country : []}
          style={'defaultDropdown'}
          title={'Гражданство'}
          multiselect={true}
          defaultValue={fields.nationalities.map(
            (item) => item && item.nationality
          )}
        />
        <label
          className={
            nationalitys.includes('Russia') || nationalitys.length === 0
              ? styles.hidden
              : styles.checkboxContainer
          }
          onClick={() => dispatch(setWorkPermit(!fields.workPermit))}
        >
          <input
            readOnly={true}
            className={styles.inputCheckbox}
            onClick={(e) => e.stopPropagation()}
            checked={fields.workPermit}
            type='checkbox'
          />
          <span className={styles.checkboxIndicator}></span>
          Разрешение на работу
        </label>
        <button type={'submit'} className={styles.btnContinue}>
          Продолжить
        </button>
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

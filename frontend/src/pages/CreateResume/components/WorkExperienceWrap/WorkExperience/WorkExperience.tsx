import React, { useEffect, useState, Dispatch, ChangeEvent } from 'react'
import { Autocomplete, Dropdown, Icon, Input } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import {
  addFieldExperiences,
  setWorkExperience,
} from '../../../../../store/slices/createResumeSlice'
import { addDictionary } from '../../../../../store/slices/dictionariesSlice'
import { directoryApi } from '../../../../../services/directoryApi/directoryApi'
import styles from './WorkExperience.module.css'

interface IWorkExperience {
  id: number
  index: number
  experienceState: {
    id: number
    position: string
    companyName: string
    startDate: string
    endDate: string
    site: string
    description: string
  }
  isLastExperience: boolean
  generalExperience: {
    id: number
    experienceMonth: number
    isErrorEndMonth: boolean
  }[]
  setGeneralExperience: Dispatch<
    { id: number; experienceMonth: number; isErrorEndMonth: boolean }[]
  >
  isEdit: boolean
}

export const WorkExperience = (props: IWorkExperience) => {
  const {
    id,
    experienceState,
    index,
    generalExperience,
    setGeneralExperience,
    isEdit,
  } = props

  const { mas, glossary } = useAppSelector((state) => state.directories)
  const { fields } = useAppSelector((state) => state.createResume)

  const dispatch = useAppDispatch()

  const [isCardActive, setCardActive] = useState<boolean>()

  const [totallyWorkExperience, setTotallyWorkExperience] = useState({
    yearFrom:
      0 ||
      (experienceState.startDate &&
        new Date(experienceState.startDate).getFullYear()),
    yearTo:
      0 ||
      (experienceState.startDate &&
        new Date(experienceState.endDate).getFullYear()),
    monthFrom:
      experienceState.startDate &&
      (new Date(experienceState.startDate).getMonth() < 9
        ? `0${new Date(experienceState.startDate).getMonth() + 1}`
        : new Date(experienceState.startDate).getMonth() + 1),
    monthTo:
      experienceState.endDate &&
      (new Date(experienceState.endDate).getMonth() < 9
        ? `0${new Date(experienceState.endDate).getMonth() + 1}`
        : new Date(experienceState.endDate).getMonth() + 1),
    generalExperience: '',
    isNowDays: false,
  })

  const [position, setPosition] = useState(experienceState.position || '')

  const [isValidDescription, setValidDescription] = useState(true)

  const [isErrorFinishDate, setErrorFinishDate] = useState(false)

  useEffect(() => {
    if (
      experienceState.description && experienceState.description.length !== 0
        ? experienceState.description.trim().length === 0
        : false
    ) {
      setValidDescription(true)
    } else {
      setValidDescription(false)
    }
  }, [experienceState.description])

  useEffect(() => {
    directoryApi.getDirectory('month').then((res) => {
      dispatch(addDictionary({ name: 'month', value: res }))
    })
    directoryApi.getDirectory('position').then((res) => {
      dispatch(addDictionary({ name: 'position', value: res }))
    })
  }, [dispatch])

  const Year = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  })
  const [countOfExperience, setCountOfExperience] = useState()

  const Month = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'month',
    unitDisplay: 'long',
  })

  useEffect(() => {
    if (
      ((totallyWorkExperience.yearTo !== '' &&
        totallyWorkExperience.monthTo !== '') ||
        totallyWorkExperience.isNowDays) &&
      totallyWorkExperience.yearFrom !== '' &&
      totallyWorkExperience.monthFrom !== ''
    ) {
      dispatch(
        setWorkExperience(
          fields.experiences.map((experience: { id: number }) =>
            experience.id === id
              ? {
                  ...experience,
                  startDate: new Date(
                    totallyWorkExperience.yearFrom,
                    totallyWorkExperience.monthFrom - 1
                  )
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .reverse()
                    .join('-'),
                  endDate: totallyWorkExperience.isNowDays
                    ? new Date(Date.now())
                        .toLocaleDateString('en-GB')
                        .split('/')
                        .reverse()
                        .join('-')
                    : new Date(
                        totallyWorkExperience.yearTo,
                        totallyWorkExperience.monthTo - 1
                      )
                        .toLocaleDateString('en-GB')
                        .split('/')
                        .reverse()
                        .join('-'),
                  position: position,
                }
              : experience
          )
        )
      )

      const yearDiff = !totallyWorkExperience.isNowDays
        ? totallyWorkExperience.yearTo - totallyWorkExperience.yearFrom
        : new Date(Date.now()).getFullYear() - totallyWorkExperience.yearFrom
      const monthDiff = !totallyWorkExperience.isNowDays
        ? totallyWorkExperience.monthTo - totallyWorkExperience.monthFrom
        : new Date(Date.now()).getMonth() + 1 - totallyWorkExperience.monthFrom
      setCountOfExperience(getFullPeriod())
      if (monthDiff < 0) {
        totallyWorkExperience.generalExperience = String(
          `${yearDiff - 1 !== 0 ? Year.format(yearDiff - 1) : ''} ${
            monthDiff + 12 !== 0 ? Month.format(monthDiff + 12) : ''
          }`
        )
      } else {
        totallyWorkExperience.generalExperience = String(
          `${yearDiff !== 0 ? Year.format(yearDiff) : ''} ${
            monthDiff !== 0 ? Month.format(monthDiff) : ''
          }`
        )
      }
    } else {
      dispatch(
        setWorkExperience(
          fields.experiences.map((experience: { id: number }) =>
            experience.id === id
              ? {
                  ...experience,
                  startDate: '',
                  endDate: '',
                  position: position,
                }
              : experience
          )
        )
      )
    }
    if (
      totallyWorkExperience.yearFrom !== '' ||
      (totallyWorkExperience.monthFrom !== '' &&
        ((totallyWorkExperience.monthTo === '' &&
          totallyWorkExperience.yearTo === '') ||
          totallyWorkExperience.isNowDays))
    ) {
      setErrorFinishDate(true)
    } else {
      setErrorFinishDate(false)
    }
  }, [totallyWorkExperience, position])

  useEffect(() => {
    if (
      ((totallyWorkExperience.yearTo !== '' &&
        totallyWorkExperience.monthTo !== '') ||
        totallyWorkExperience.isNowDays) &&
      totallyWorkExperience.yearFrom !== '' &&
      totallyWorkExperience.monthFrom !== ''
    ) {
      setGeneralExperience(
        generalExperience.map((item) =>
          item.id === index
            ? {
                ...item,
                experienceMonth: 12,
                isErrorEndMonth:
                  (new Date(experienceState.endDate).getFullYear() ===
                    new Date().getFullYear() &&
                    new Date(experienceState.endDate).getMonth()) >
                  new Date().getMonth(),
              }
            : item
        )
      )
    }
  }, [countOfExperience])

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
  const getFullPeriod = () => {
    const date1 = new Date(
      totallyWorkExperience.yearFrom,
      totallyWorkExperience.monthFrom
    )
    const date2 = totallyWorkExperience.isNowDays
      ? new Date(new Date().getFullYear(), new Date().getMonth() + 1)
      : new Date(totallyWorkExperience.yearTo, totallyWorkExperience.monthTo)
    let diffMonths = (date2.getFullYear() - date1.getFullYear()) * 12
    diffMonths -= date1.getMonth()
    diffMonths += date2.getMonth()
    const years = (diffMonths / 12) | 0
    const leftMonth = diffMonths % 12 | 0
    return `${years > 0 ? formatterYear.format(years) : ''} ${
      leftMonth > 0 ? formatterMonth.format(leftMonth) : ''
    }`
  }
  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setWorkExperience(
        fields.experiences.map((experience: { id: number }) =>
          experience.id === id
            ? {
                ...experience,
                [e.target.name]: e.target.value,
              }
            : experience
        )
      )
    )
  }

  return (
    <div className={styles.wrap}>
      {!isCardActive ? (
        <div className={styles.wrap}>
          <Input
            isFocus={isEdit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            name='companyName'
            defaultValue={experienceState.companyName}
            inputType='defaultInput'
            title='Организация'
            pattern={
              experienceState.companyName?.trim().length > 0
                ? '[a-zA-ZА-Яа-я0-9,._]{1,100}'
                : ''
            }
            required={
              experienceState.site !== '' ||
              experienceState.position !== '' ||
              experienceState.startDate !== ''
            }
            error={
              experienceState.companyName?.trim().length === 0 &&
              experienceState.companyName.length !== 0
                ? 'Введено недопустимое значение поля "Организация"'
                : 'Поле организация обязательно для заполнения'
            }
          />
          <Input
            isFocus={isEdit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            name='site'
            pattern='https?://(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(/[^ ]*)?'
            inputType='defaultInput'
            title='Сайт организации'
            defaultValue={experienceState.site}
            error='Введено недопустимое значение поля "Веб сайт".'
          />
          <Autocomplete
            title='Должность'
            onChange={setPosition}
            isAutoClean={false}
            isOnlyDictionaryValue={false}
            errorField='Должность'
            isUniqueValue={false}
            isFocus={isEdit}
            dictionary={mas['position']}
            defaultValue={
              glossary?.position?.[experienceState?.position]
                ? glossary?.position?.[experienceState?.position]
                : experienceState?.position
            }
            required={
              experienceState.endDate !== '' ||
              experienceState.companyName !== '' ||
              experienceState.description !== '' ||
              experienceState.startDate !== ''
            }
          />
          <div className={styles.subTitle}>Начало работы</div>
          <Dropdown
            onChange={setTotallyWorkExperience}
            state={totallyWorkExperience}
            name='monthFrom'
            style='mediumDropdown'
            title='Месяц'
            dropItems={mas['month']}
            defaultValue={
              totallyWorkExperience.monthFrom != null &&
              totallyWorkExperience.monthFrom
            }
            required={
              totallyWorkExperience.yearFrom !== '' &&
              totallyWorkExperience.yearFrom !== 0
            }
            error={
              'Поле обязательно для заполнения, если заполнено поле "Год от"'
            }
          />
          <Input
            inputType='mediumInput'
            title='Год'
            type='number'
            isFocus={isEdit}
            min={1910}
            max={
              Number(new Date(Date.now()).getFullYear()) &&
              (experienceState.endDate
                ? Number(new Date(experienceState.endDate).getFullYear())
                : Number(new Date(Date.now()).getFullYear()))
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTotallyWorkExperience({
                ...totallyWorkExperience,
                yearFrom: Number(e.target.value),
              })
            }
            error={
              totallyWorkExperience.yearFrom != null
                ? 'Значение в поле "Год от" превышает текущий год или превышает значения года в поле "Год до"'
                : 'Поле обязательно для заполнения, если заполнен месяц начала работы.'
            }
            required={
              experienceState.position !== '' ||
              experienceState.companyName !== '' ||
              totallyWorkExperience.isNowDays ||
              totallyWorkExperience.monthFrom !== ''
            }
            defaultValue={
              totallyWorkExperience.yearFrom !== 0
                ? totallyWorkExperience.yearFrom
                : undefined
            }
          />
          <div className={styles.subTitle}>Окончание работы</div>
          <div className={styles.wrapCheckbox}>
            <div
              className={styles.checkbox}
              onClick={() =>
                setTotallyWorkExperience({
                  ...totallyWorkExperience,
                  isNowDays: !totallyWorkExperience.isNowDays,
                })
              }
            >
              <input
                type='checkbox'
                readOnly={true}
                checked={totallyWorkExperience.isNowDays}
              />
              По настоящий момент
            </div>
          </div>
          {!totallyWorkExperience.isNowDays && (
            <Dropdown
              onChange={setTotallyWorkExperience}
              state={totallyWorkExperience}
              name='monthTo'
              isNowError={generalExperience.at(index)?.isErrorEndMonth}
              style='mediumDropdown'
              title='Месяц'
              dropItems={mas['month']}
              defaultValue={
                totallyWorkExperience.monthTo != null &&
                totallyWorkExperience.monthTo
              }
              required={
                (totallyWorkExperience.yearTo !== '' &&
                  totallyWorkExperience.yearTo !== 0) ||
                (totallyWorkExperience.yearFrom !== '' &&
                  totallyWorkExperience.yearFrom !== 0) ||
                totallyWorkExperience.monthFrom !== ''
              }
              error={
                generalExperience.at(id)?.isErrorEndMonth
                  ? 'Указанный месяц не должен превышать текущий месяц.'
                  : isErrorFinishDate
                  ? 'Если заполнены поля "Начало работы", обязательны к заполнению поля "Окончание" или флажок "По\n' +
                    '                            настоящее время."'
                  : 'Поле обязательно для заполнения, если заполнено поле "Год до"'
              }
            />
          )}
          {!totallyWorkExperience.isNowDays && (
            <Input
              inputType='mediumInput'
              title='Год'
              type='number'
              isFocus={isEdit}
              min={
                1910 &&
                experienceState.startDate &&
                new Date(experienceState.startDate).getFullYear()
              }
              max={new Date(Date.now()).getFullYear()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTotallyWorkExperience({
                  ...totallyWorkExperience,
                  yearTo: Number(e.target.value),
                })
              }
              error={
                totallyWorkExperience.yearTo != null
                  ? 'Значение в поле "Год до" превышает текущий год или меньше значения года в поле "Год от"'
                  : 'Поле обязательно для заполнения, если заполнен месяц окончания работы.'
              }
              required={totallyWorkExperience.monthTo !== ''}
              defaultValue={
                totallyWorkExperience.yearTo !== 0
                  ? totallyWorkExperience.yearTo
                  : undefined
              }
            />
          )}
          <div className={styles.wrapExperience}>
            <span className={styles.title}>Стаж</span>
            <div className={styles.experience}>
              {totallyWorkExperience.generalExperience
                ? countOfExperience
                : 'Укажите опыт работы, данные автоматически обновятся'}
              {totallyWorkExperience.generalExperience.includes('-') && (
                <div className={styles.error}>
                  Введите корректное значение начала и окончания работы
                </div>
              )}
            </div>
          </div>
          <div className={styles.wrapDescription}>
            <textarea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                onChangeInput(e)
              }
              defaultValue={experienceState.description}
              name='description'
              maxLength={2499}
              className={
                !isValidDescription
                  ? styles.description
                  : styles.errorDescription
              }
              placeholder='Опишите, что вы делали на работе'
            ></textarea>
            {isValidDescription ? (
              <div className={styles.error}>
                Введено недопустимое значение поля "Обязанности".
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.cardWrap}>
            <div className={styles.navCard}>
              {`${experienceState.startDate} - ${experienceState.endDate}`}
              <div>
                <button
                  className={styles.btnNav}
                  onClick={() => setCardActive(false)}
                >
                  <Icon.Edit />
                </button>
                <button
                  className={styles.btnNav}
                  onClick={() => {
                    setGeneralExperience(
                      generalExperience.filter((item) => item.id !== id)
                    )
                    dispatch(
                      addFieldExperiences(
                        fields.experiences.filter(
                          (experience) => experience.id !== id
                        )
                      )
                    )
                  }}
                >
                  <Icon.Trash />
                </button>
              </div>
            </div>
            <div className={styles.position}>{experienceState.position}</div>
            <div className={styles.descriptionExperience}>
              {experienceState.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

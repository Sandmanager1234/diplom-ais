import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Dropdown,
  Icon,
  InputRange,
  MultiSelectDropdown,
} from 'UI'

import { useAppDispatch, useAppSelector } from 'store'
import { dictionariesSlice } from 'store/slices/dictionariesSlice'
import { setResumes } from 'store/slices/resumeSlice'
import {
  setAgeFrom,
  setAgeTo,
  SetSalaryFrom,
  SetSalaryTo,
  SetSummaryExperienceFrom,
  SetSummaryExperienceTo,
  SetInitialState,
  SetSkill,
  setCountry,
  setRegion,
  setCity,
  setPosition,
  setGrade,
  SetEducationType,
  SetEmploymentType,
  SetLanguage,
  SetLanguageLevel,
  setPage,
  SetStatus,
  SetViewResume,
  setCountryId,
  setRegionIds,
  setCityIds,
  setIsActiveFilters,
} from 'store/slices/filterResumeSlice'
import { useGetDirectoryQuery } from 'store/api/directoryApi'
import { directoryApi } from 'services/directoryApi/directoryApi'
import { resumesApi } from 'services/resumesApi/resumesApi'
import { IFilters } from './models'
import { removeEmptyValues } from 'utils/removeEmptyValues'
import styles from './Filters.module.css'

interface IFilterProps {
  isActive?: boolean
  setActive?: React.Dispatch<boolean>
  setFastFilterIndex: React.Dispatch<{ activeFilter: number }>
}

export const Filters: React.FC<IFilterProps> = (props) => {
  const {isActive, setFastFilterIndex } = props

  const { mas } = useAppSelector((state) => state.directories)
  const { filteringFields, additionalFiltersField, isActiveFilters } = useAppSelector(
    (state) => state.filterResume
  )
  const { isFavourite } = useAppSelector((state) => state.resumes.tabRequests)
  const { isPresentResponsibleHr } = useAppSelector((state) => state.resumes.tabRequests)
  const { sorting } = useAppSelector((state) => state.resumes)
  const { addDictionary } = dictionariesSlice.actions
  const descOrAsc = Object.entries(removeEmptyValues({ ...sorting }))
    .map((item) => `sort=${item[0]},${item[1]}&`)
    .join('')
  const dispatch = useAppDispatch()
  const [filters, setFilters] = useState<IFilters>({})
  const [skill, setSkill] = useState()
  const [resetPosition, setResetPosition] = useState(false)
  const [skills, setSkills] = useState<
    {
      id: number
      skillName: string
    }[]
  >(
    filteringFields.skills
      ? filteringFields.skills.split('&skills=').map((i) => ({
          id: Math.random(),
          skillName: i,
        }))
      : []
  )
  const [countryFilter, setCountryFilter] = useState({
    id: additionalFiltersField.countryId,
    value: filteringFields.country,
  })
  const [regionFilter, setRegionFilter] = useState(
    additionalFiltersField.regionIds
  )
  const [cityFilter, setCityFilter] = useState(additionalFiltersField.cityIds)
  const [positionFilter, setPositionFilter] = useState(
    filteringFields.position || ''
  )

  const { data: countryDirectory } = useGetDirectoryQuery('country')
  const { data: positionDirectory } = useGetDirectoryQuery('position')
  const { data: skillsDirectory } = useGetDirectoryQuery('skill')
  const { data: gradeDirectory } = useGetDirectoryQuery('grade')
  const { data: educationTypeDirectory } =
    useGetDirectoryQuery('education-type')
  const { data: employmentTypeDirectory } =
    useGetDirectoryQuery('employment-type')
  const { data: currencyDirectory } = useGetDirectoryQuery('currency')
  const { data: languageDirectory } = useGetDirectoryQuery('language')
  const { data: levelDirectory } = useGetDirectoryQuery('language-level')
  const { data: statusDirectory } = useGetDirectoryQuery('status')

  // const filterParams = Object.entries(
  //   removeEmptyValues({ ...filters, ...filteringFields })
  // )
  //   .map((filterParam) => `&${filterParam[0]}=${filterParam[1]}`)
  //   .join('')

  let filterParams=`page=0&size=10&isFavourite=${isFavourite}&isPresentResponsibleHr=${isPresentResponsibleHr}&`

  if (filteringFields.country){
    filterParams+=`country=${filteringFields.country}&`
    filterParams+=`regionExcluded=${filteringFields.regionExcluded}&`

    if(additionalFiltersField.regionIds.length){
      additionalFiltersField.regionIds.map((item: any) =>{
        filterParams+=`${item.id}&`
      })
      filterParams+=`cityExcluded=${filteringFields.cityExcluded}&`
      if(additionalFiltersField.cityIds.length){
        additionalFiltersField.cityIds.map((item: any) =>{
          filterParams+=`cityId=${item.id}&`
        })
      }
    }
  }

  filterParams+=filteringFields.ageFrom&&`ageFrom=${filteringFields.ageFrom}&`
  filterParams+=filteringFields.ageTo&&`ageTo=${filteringFields.ageTo}&`
  filterParams+=filteringFields.position&&`position=${filteringFields.position}&`
  filterParams+=filteringFields.skills&&`skills=${filteringFields.skills}&`
  filterParams+=filteringFields.grade&&`grade=${filteringFields.grade}&`
  filterParams+=filteringFields.summaryExperienceFrom&&`summaryExperienceFrom=${filteringFields.summaryExperienceFrom}&`
  filterParams+=filteringFields.summaryExperienceTo&&`summaryExperienceTo=${filteringFields.summaryExperienceTo}&`
  filterParams+=filteringFields.salaryFrom&&`salaryFrom=${filteringFields.salaryFrom}&`
  filterParams+=filteringFields.salaryTo&&`salaryTo=${filteringFields.salaryTo}&`
  filterParams+=filteringFields.currency&&`currency=${filteringFields.currency}&`
  filterParams+=filteringFields.educationType&&`educationType=${filteringFields.educationType}&`
  filterParams+=filteringFields.employmentType&&`employmentType=${filteringFields.employmentType}&`
  filterParams+=filteringFields.language&&`language=${filteringFields.language}&`
  filterParams+=filteringFields.languageLevel&&`languageLevel=${filteringFields.languageLevel}&`
  filterParams+=filteringFields.status&&`status=${filteringFields.status}&`
  filterParams+=filteringFields.isViewed&&`isViewed=${filteringFields.isViewed}&`

  const resetFilters = () => {
    setResetPosition(true)
    dispatch(SetInitialState())
    setCountryFilter({ id: '', value: '' })
    setRegionFilter([])
    setCityFilter([])
    setPositionFilter('')
    setFilters({})
    setSkills([])
    setFastFilterIndex({ activeFilter: -1 })
  }

  useEffect(() => {
    resumesApi
      .getApplicantsWithFilters(`${filterParams}&${descOrAsc}`)
      .then(({ data }) => {
        dispatch(setResumes(data.content))
      })
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      SetSkill(
        skills
          .map((skill, index) =>
            index == 0 ? skill.skillName : `skills=${skill.skillName}`
          )
          .join('&')
      )
    )
    dispatch(setPosition(filters.position || ''))
    dispatch(setGrade(filters.grade || ''))
    dispatch(SetEducationType(filters.educationType || ''))
    dispatch(SetEmploymentType(filters.employmentType || ''))
    dispatch(SetLanguage(filters.language || ''))
    dispatch(SetLanguageLevel(filters.languageLevel || ''))
    dispatch(SetStatus(filters.status || ''))
    setPositionFilter('')
    dispatch(setPage(0))
    resumesApi
      .getApplicantsWithFilters(`${filterParams}&${descOrAsc}`)
      .then(({ data }) => {
        dispatch(setResumes(data.content))
      })
  }

  useEffect(() => {
    skill &&
      !skills.map((item) => item.skillName).includes(skill) &&
      setSkills([
        ...skills,
        {
          id: Math.random(),
          skillName: skill,
        },
      ])
  }, [skill, skills])

  useEffect(() => {
    if (countryFilter.id !== '' && countryFilter.id != undefined) {
      directoryApi.getRegions(countryFilter.id).then((res) =>
        dispatch(
          addDictionary({
            name: 'region',
            value: res,
          })
        )
      )
      setFilters({ ...filters, country: countryFilter.value })
      dispatch(setCountry(countryFilter.value))
      dispatch(setCountryId(countryFilter.id))
    } else {
      dispatch(setCountry(''))
      dispatch(setRegion(''))
      dispatch(setCity(''))
    }
    if (regionFilter.length && countryFilter.id) {
      setFilters({
        ...filters,
        regions: regionFilter.map((item) => item.value).join(','),
      })
      directoryApi
        .getCities(regionFilter.map((item) => `${item.id}&`).join(''))
        .then((res) =>
          dispatch(
            addDictionary({
              name: 'city',
              value: res,
            })
          )
        )
      dispatch(setRegionIds(regionFilter))
      dispatch(setRegion(regionFilter.map((item) => item.value).join(',')))
    } else {
      setFilters({ ...filters, regions: '' })
      dispatch(setRegion(''))
    }
    if (cityFilter.length && countryFilter.id) {
      setFilters({
        ...filters,
        cities: cityFilter.map((item) => item?.value).join(','),
      })
      dispatch(setCity(cityFilter.map((item) => item?.value).join(',')))
      dispatch(setCityIds(cityFilter))
    } else {
      setFilters({ ...filters, cities: '' })
      dispatch(setCity(''))
    }
    if (positionFilter !== '') {
      setFilters({ ...filters, position: positionFilter })
    }
  }, [countryFilter, regionFilter, cityFilter, positionFilter])

  useEffect(() => {
    !filteringFields.language && dispatch(SetLanguageLevel(''))
  }, [filteringFields.language])

  return (
    <form
      className={isActiveFilters ? styles.filters : styles.hidden}
      onKeyDown={(e) => e.key == 'Enter' && e.preventDefault()}
      onSubmit={(e) => onSubmit(e)}
    >
      <div className={styles.title}>
        Фильтр
        <button
          type={'button'}
          onClick={() => {
            dispatch(setIsActiveFilters(false));
          }}
          className={styles.exitFilters}
        >
          <Icon.ArrowLogIn />
        </button>
      </div>
      <div className={styles.container}>
        <Dropdown
          returnId={true}
          onChange={setCountryFilter}
          defaultValue={filteringFields.country}
          name={'country'}
          title='Страна'
          dropItems={countryDirectory}
          style='defaultDropdown'
        />
        <MultiSelectDropdown
          defaultValue={filteringFields.regions}
          onChange={setRegionFilter}
          state={regionFilter}
          title='Регион'
          dropItems={mas.region.data}
        />
        <MultiSelectDropdown
          defaultValue={filteringFields.cities || filters.cities}
          onChange={setCityFilter}
          state={cityFilter}
          title='Город'
          dropItems={mas.city.data}
        />
        <InputRange
          title={'Возраст'}
          minFrom={18}
          minTo={filteringFields.ageFrom || 18}
          fieldFrom={filteringFields.ageFrom}
          fieldTo={filteringFields.ageTo}
          dispatchFrom={setAgeFrom}
          dispatchTo={setAgeTo}
          max={99}
        />
        <Dropdown
          onChange={setFilters}
          state={filters}
          defaultValue={filteringFields.position || filters.position}
          name={'position'}
          title='Должность'
          maxHeight={393}
          dropItems={positionDirectory}
          style='defaultDropdown'
        />
        {/* <Autocomplete
          isAutoClean={true}
          title={'Ключевые навыки'}
          onChange={setSkill}
          dictionary={skillsDirectory}
          isUniqueValue={false}
          setReset={setResetPosition}
          reset={resetPosition}
        /> */}
        {skills.length !== 0 && (
          <div className={styles.wrapSkills}>
            {skills.map((skill: { id: number; skillName: string }) => (
              <div key={skill.id} className={styles.skill}>
                {skill.skillName}
                <button
                  className={styles.btnDelete}
                  id={String(skill.id)}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setSkills(
                      skills.filter((item) => String(item.id) !==e.currentTarget.id)
                    )
                  }
                }
                ></button>
                <Icon.XMarkCircle />
              </div>
            ))}
          </div>
        )}
        <Dropdown
          onChange={setFilters}
          defaultValue={filteringFields.grade || filters.grade}
          state={filters}
          name={'grade'}
          title='Грэйд'
          dropItems={gradeDirectory}
          style='defaultDropdown'
        />
        <InputRange
          title={'Опыт работы, лет'}
          minFrom={0}
          minTo={0 || Number(filteringFields.summaryExperienceFrom) / 12}
          fieldFrom={filteringFields.summaryExperienceFrom}
          fieldTo={filteringFields.summaryExperienceTo}
          dispatchFrom={SetSummaryExperienceFrom}
          dispatchTo={SetSummaryExperienceTo}
          max={65}
        />
        <InputRange
          title={'Зарплата'}
          directory={currencyDirectory}
          minFrom={0}
          minTo={filteringFields.salaryFrom}
          fieldFrom={filteringFields.salaryFrom}
          fieldTo={filteringFields.salaryTo}
          dispatchFrom={SetSalaryFrom}
          dispatchTo={SetSalaryTo}
          max={1000000}
        />
        <Dropdown
          onChange={setFilters}
          defaultValue={filteringFields.educationType || filters.educationType}
          state={filters}
          name={'educationType'}
          title='Образование'
          dropItems={educationTypeDirectory}
          style='defaultDropdown'
        />
        <Dropdown
          onChange={setFilters}
          defaultValue={
            filteringFields.employmentType || filters.employmentType
          }
          state={filters}
          name={'employmentType'}
          title='Тип занятости'
          dropItems={employmentTypeDirectory}
          style='defaultDropdown'
        />
        <Dropdown
          onChange={setFilters}
          defaultValue={filteringFields.language || filters.language}
          state={filters}
          name={'language'}
          title='Знание языков'
          dropItems={languageDirectory}
          style={'defaultDropdown'}
        />
        {/* {(filters.language || filteringFields.language) && (
          <Dropdown
            onChange={setFilters}
            defaultValue={
              filteringFields.languageLevel || filters.languageLevel
            }
            state={filters}
            name={'languageLevel'}
            title='Уровень'
            dropItems={levelDirectory}
            style={'defaultDropdown'}
          />
        )}
        <Dropdown
          onChange={setFilters}
          defaultValue={filteringFields.status || filters.status}
          state={filters}
          name={'status'}
          title='Статус'
          dropItems={statusDirectory}
          style={'defaultDropdown'}
        /> */}
        <div className={styles.viewResumeChecker}>
          <label
            onClick={() =>
              dispatch(
                SetViewResume(filteringFields.isViewed === '' ? false : '')
              )
            }
            className={
              filteringFields.isViewed !== ''
                ? styles.checkboxContainerActive
                : styles.checkboxContainer
            }
          >
            <input
              readOnly={true}
              className={styles.inputCheckbox}
              onClick={(e) => e.stopPropagation()}
              checked={filteringFields.isViewed !== ''}
              type='checkbox'
            />
            <span className={styles.checkboxIndicator}></span>
          </label>
          Только не просмотренные резюме
        </div>
      </div>
      <div className={styles.buttonResetAndApply}>
        <button
          type='reset'
          className={styles.buttonReset}
          onClick={resetFilters}
        >
          Сбросить
        </button>
        <button type='submit' className={styles.buttonApply}>
          Применить
        </button>
      </div>
    </form>
  )
}

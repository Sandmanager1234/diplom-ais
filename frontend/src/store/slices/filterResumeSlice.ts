import { createSlice } from '@reduxjs/toolkit'

const initialStateFilter = {
  page: '',
  size: '',
  country: '',
  countryId: '',
  regions: '',
  regionIds: [],
  regionExcluded: false,
  cities: '',
  cityExcluded: false,
  ageFrom: '',
  ageTo: '',
  position: '',
  grade: '',
  summaryExperienceFrom: '',
  summaryExperienceTo: '',
  salaryFrom: '',
  salaryTo: '',
  currency: '',
  skills: '',
  educationType: '',
  employmentType: '',
  language: '',
  languageLevel: '',
  status: '',
  isViewed: '',
  isActiveFilters: false,
}
export const filterResumeSlice = createSlice({
  name: 'filterResume',
  initialState: {
    filteringFields: {
      page: '',
      size: '',
      country: '',
      regions: '',
      regionExcluded: false,
      cities: '',
      cityExcluded: false,
      ageFrom: '',
      ageTo: '',
      position: '',
      grade: '',
      summaryExperienceFrom: '',
      summaryExperienceTo: '',
      salaryFrom: '',
      salaryTo: '',
      currency: '',
      skills: '',
      educationType: '',
      employmentType: '',
      language: '',
      languageLevel: '',
      status: '',
      isViewed: '',
    },
    additionalFiltersField:{
      regionIds: [],
      countryId: '',
      cityIds:[]
    },
    isActiveFilters: false,
  },
  reducers: {
    setPage(state, action) {
      state.filteringFields = { ...state.filteringFields, page: action.payload }
    },
    setIsActiveFilters(state, action) {
      state.isActiveFilters =  action.payload
    },
    setSize(state, action) {
      state.filteringFields = { ...state.filteringFields, size: action.payload }
    },
    setCountry(state, action) {
      state.filteringFields = { ...state.filteringFields, country: action.payload }
    },
    setRegion(state, action) {
      state.filteringFields = { ...state.filteringFields, regions: action.payload }
    },
    setRegionExcluded(state, action) {
      state.filteringFields = { ...state.filteringFields, regionExcluded: action.payload }
    },
    setCityExcluded(state, action) {
      state.filteringFields = { ...state.filteringFields, cityExcluded: action.payload }
    },
    setCity(state, action) {
      state.filteringFields = { ...state.filteringFields, cities: action.payload }
    },
    setAgeFrom(state, action) {
      state.filteringFields = { ...state.filteringFields, ageFrom: action.payload }
    },
    setAgeTo(state, action) {
      state.filteringFields = { ...state.filteringFields, ageTo: action.payload }
    },
    setPosition(state, action) {
      state.filteringFields = { ...state.filteringFields, position: action.payload }
    },
    setGrade(state, action) {
      state.filteringFields = { ...state.filteringFields, grade: action.payload }
    },
    SetSummaryExperienceFrom(state, action) {
      state.filteringFields = { ...state.filteringFields, summaryExperienceFrom: action.payload }
    },
    SetSummaryExperienceTo(state, action) {
      state.filteringFields = { ...state.filteringFields, summaryExperienceTo: action.payload }
    },
    SetSalaryFrom(state, action) {
      state.filteringFields = { ...state.filteringFields, salaryFrom: action.payload }
    },
    SetSalaryTo(state, action) {
      state.filteringFields = { ...state.filteringFields, salaryTo: action.payload }
    },
    SetCurrency(state, action) {
      state.filteringFields = { ...state.filteringFields, currency: action.payload }
    },
    SetEducationType(state, action) {
      state.filteringFields = { ...state.filteringFields, educationType: action.payload }
    },
    SetEmploymentType(state, action) {
      state.filteringFields = { ...state.filteringFields, employmentType: action.payload }
    },
    SetLanguage(state, action) {
      state.filteringFields = { ...state.filteringFields, language: action.payload }
    },
    SetLanguageLevel(state, action) {
      state.filteringFields = { ...state.filteringFields, languageLevel: action.payload }
    },
    SetSkill(state, action) {
      state.filteringFields = { ...state.filteringFields, skills: action.payload }
    },
    SetStatus(state, action) {
      state.filteringFields = { ...state.filteringFields, status: action.payload }
    },
    SetViewResume(state, action) {
      state.filteringFields = { ...state.filteringFields, isViewed: action.payload }
    },
    SetInitialState(state) {
      state.filteringFields = initialStateFilter
    },
    setCountryId(state, action) {
      state.additionalFiltersField.countryId = action.payload
    },
    setRegionIds(state, action) {
      state.additionalFiltersField.regionIds = action.payload
    },
    setCityIds(state, action) {
      state.additionalFiltersField.cityIds = action.payload
    },
  },
})
export const {
  setIsActiveFilters,
  setCityIds,
  setRegionIds,
  setCountryId,
  setPage,
  setSize,
  setCountry,
  setRegion,
  setRegionExcluded,
  setCity,
  setCityExcluded,
  setAgeFrom,
  setAgeTo,
  setPosition,
  setGrade,
  SetSummaryExperienceFrom,
  SetSummaryExperienceTo,
  SetSalaryFrom,
  SetSalaryTo,
  SetCurrency,
  SetSkill,
  SetEducationType,
  SetEmploymentType,
  SetLanguage,
  SetLanguageLevel,
  SetStatus,
  SetViewResume,
  SetInitialState,
} = filterResumeSlice.actions
export default filterResumeSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Resumes, ResumeStatus } from 'types'

import {  useAppSelector , AppDispatch, AppStore } from 'store'
import { ApplicantCard, Applicants } from '../../services/resumesApi/models'
import { setPosition, SetSkill } from './filterResumeSlice'
import { resumesApi } from '../../services/resumesApi/resumesApi'

import { LoadingStatus } from '../data/models'
import { Condition } from 'pages/Resumes/components/SearchBar/constants/conditions'
import { MAP_STATUS_TO_UPPERCASE } from '../../data/personalDataConstants'
import { useState } from 'react'
import { IFilters } from '../../pages/Resumes/components/Filters/models'
import { removeEmptyValues } from 'utils/removeEmptyValues'

const initialState: Resumes = {
  activeMenu: true,
  isModalWindowDelete: false,
  resumes: [],
  sorting: {
    name: '',
    summaryExperience: '',
    salary: '',
  },
  currentResume: {
    id: '',
  },
  favouriteListFolders: [],
  pagination: {
    currentPage: 0,
    totalCount: 1,
  },
  loadingStatus: LoadingStatus.IDLE,
  tabRequests: {
    isFavourite: false,
    isPresentResponsibleHr: false,
  },
  activeTab: Condition.ALL,
}


export const searchResumesThunk =
  (listSuggest: Array<any>) => (dispatch: AppDispatch) => {
    if (listSuggest.length) {
      dispatch(
        setPosition(
          listSuggest
            .filter((item: any) => item.directoryType.includes('POSITION'))
            .map((item: any) => item.code)
            .toString()
        )
      )
      dispatch(
        SetSkill(
          listSuggest
            .filter((item: any) => item.directoryType.includes('SKILL'))
            .map((item: any) => item.code)
            .toString()
        )
      )
      dispatch(
        setCurrentResume(
          listSuggest
            .filter((item: any) => item.directoryType.includes('APPLICANT'))
            .map((item: any) => item.valueId)
            .toString()
        )
      )
    } else {
      resumesApi
        .getApplicants({
          page: 0,
          size: 10,
        })
        .then(({ data }) => {
          dispatch(setResumes(data.content))
        })
    }
  }

export type ChangeApplicantStatusArgs = {
  id: string
  name: string
  camelCaseName: ResumeStatus
  resumeId: string
}

export const changeApplicantStatus = createAsyncThunk<
  void,
  ChangeApplicantStatusArgs,
  { dispatch: AppDispatch }
>(
  'resumes/changeApplicantStatus',
  async ({ id, name, camelCaseName, resumeId }, { dispatch }) => {
    await resumesApi.editStatusApplicant(id, name)
    dispatch(
      setApplicantStatus({ id: id, resumeId: resumeId, status: camelCaseName })
    )
  }
)

export const loadMoreResumes = createAsyncThunk<
  Applicants,
  void,
  { state: AppStore; dispatch: AppDispatch }
>(
  'resumes/loadMoreResumes',
  async (_, { getState, dispatch }) => {
    const pagination = getState().resumes.pagination
    const filteringFields = getState().filterResume.filteringFields
    const additionalFiltersFields = getState().filterResume.additionalFiltersField
    const tabRequests = getState().resumes.tabRequests
    let filterParams=`page=${pagination.currentPage}&size=10&isFavourite=${tabRequests.isFavourite}&isPresentResponsibleHr=${tabRequests.isPresentResponsibleHr}&`

    if (filteringFields.country){
      filterParams+=`country=${filteringFields.country}&`
      filterParams+=`regionExcluded=${filteringFields.regionExcluded}&`

      if(additionalFiltersFields.regionIds.length){
        additionalFiltersFields.regionIds.map((item: any) =>{
          filterParams+=`${item.id}&`
        })
        filterParams+=`cityExcluded=${filteringFields.cityExcluded}&`
        if(additionalFiltersFields.cityIds.length){
          additionalFiltersFields.cityIds.map((item: any) =>{
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

    const { data } = await resumesApi.getApplicantsWithFilters(filterParams)
    dispatch(setTotalCount(data.totalElements))
    return data.content
  },
  {
    condition: (_, { getState }) => {
      const { resumes, pagination, loadingStatus } = getState().resumes
      return (
        loadingStatus !== 'pending' && resumes.length < pagination.totalCount
      )
    },
  }
)

export const loadMoreTaggedResumes = createAsyncThunk<
  Applicants,
  void,
  { state: AppStore; dispatch: AppDispatch }
>(
  'resumes/loadMoreResumes',
  async (_, { getState, dispatch }) => {
    const pagination = getState().resumes.pagination
    const tabRequests = getState().resumes.tabRequests
    const filterParams = {
      page: pagination.currentPage,
      size: 10,
      isFavourite: tabRequests.isFavourite,
      isPresentResponsibleHr: tabRequests.isPresentResponsibleHr,
      state: MAP_STATUS_TO_UPPERCASE[ResumeStatus.New],
    }

    const neededTags = [
      ResumeStatus.New,
      ResumeStatus.Communication,
      ResumeStatus.Interview,
      ResumeStatus.SendOffer,
      ResumeStatus.CheckSecurity,
      ResumeStatus.Screening,
      ResumeStatus.CustomerInterview,
    ]

    let totalElements = 0
    let content: Applicants = []

    const promises = neededTags.map(async (status) => {
      filterParams.state = MAP_STATUS_TO_UPPERCASE[status]
      const { data } = await resumesApi.getApplicants(filterParams)
      totalElements += data.totalElements
      content = content.concat(data.content)
    })
    await Promise.all(promises)

    dispatch(setTotalCount(totalElements))
    return content
  },
  {
    condition: (_, { getState }) => {
      const { resumes, pagination, loadingStatus } = getState().resumes
      return (
        loadingStatus !== 'pending' && resumes.length < pagination.totalCount
      )
    },
  }
)

export const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setActiveMenu(state, action) {
      state.activeMenu = action.payload
    },
    setIsModalWindowDelete(state, action) {
      state.isModalWindowDelete = action.payload
    },
    setResumes(state, action) {
      if (state.activeTab === Condition.FAVORITES) {
        action.payload = action.payload.filter(item => item.favourite)
      }
      state.resumes = action.payload
    },
    setSortName(state, action) {
      state.sorting.name = action.payload
    },
    setSorting(state, action) {
      state.sorting = { ...action.payload }
    },
    setSortSalary(state, action) {
      state.sorting.salary = action.payload
    },
    setCurrentResume(state, action) {
      state.currentResume.id = action.payload
    },
    setFavouriteList(state, action) {
      state.favouriteListFolders = action.payload
    },
    setDisconnect(state, action) {
      state.disconnect = action.payload
    },
    setConnect(state, action) {
      state.connect = action.payload
    },
    setWebsocket(state, action) {
      state.websocket = action.payload
    },
    setApplicantStatus(
      state,
      action: {
        payload: {
          id: string
          status: ResumeStatus
          resumeId: string
        }
      }
    ) {
      state.resumes = state.resumes.map((item) => {
        if (item.id === action.payload.resumeId) {
          return {
            ...item,
            vacancies: item.vacancies.map((elem) => {
              if (elem.vacancyApplicantId === action.payload.id) {
                return {
                  ...elem,
                  state: action.payload.status,
                }
              }
              return elem
            }),
          }
        }
        return item
      })
    },
    updateApplicant(
      state,
      action: { payload: { newApplicant: ApplicantCard; id: string } }
    ) {
      const indexOfApplicant = state.resumes.findIndex(
        ({ id }) => id === action.payload.id
      )

      state.resumes[indexOfApplicant] = action.payload.newApplicant
    },
    addApplicant(state, action: { payload: ApplicantCard }) {
      state.resumes = [...state.resumes, action.payload]
    },
    addApplicants(state, action: { payload: Array<ApplicantCard> }) {
      state.resumes = [...state.resumes, ...action.payload]
    },
    setCurrentPage(state, action: { payload: number }) {
      state.pagination.currentPage = action.payload
    },
    setTotalCount(state, action: { payload: number }) {
      state.pagination.totalCount = action.payload
    },
    setTabRequestsCondition(state, action) {
      const previousState = state.activeTab
      state.activeTab = action.payload

      if (action.payload === Condition.ALL) {
        state.tabRequests.isFavourite = false
        state.tabRequests.isPresentResponsibleHr = false
      }

      if (action.payload === Condition.ONLY_MINE) {
        state.tabRequests.isFavourite = false
        state.tabRequests.isPresentResponsibleHr = true
      }

      if (action.payload === Condition.FAVORITES) {
        state.tabRequests.isFavourite = true
        state.tabRequests.isPresentResponsibleHr = false
      }

      if (previousState !== action.payload) {
        state.resumes = []
        state.pagination.currentPage = 0
        state.pagination.totalCount = 1
      }
    },
    resetLoadedData(state) {
      state.resumes = []
      state.pagination.currentPage = 0
      state.pagination.totalCount = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMoreResumes.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.FULFILLED
        state.pagination.currentPage += 1
        state.resumes = [...state.resumes, ...action.payload]
      })
      .addCase(loadMoreResumes.pending, (state) => {
        state.loadingStatus = LoadingStatus.PENDING
      })
      .addCase(loadMoreResumes.rejected, (state) => {
        state.loadingStatus = LoadingStatus.REJECTED
      })
  },
})

export const {
  setActiveMenu,
  setIsModalWindowDelete,
  setResumes,
  setCurrentPage,
  setCurrentResume,
  setSorting,
  setFavouriteList,
  setApplicantStatus,
  updateApplicant,
  addApplicant,
  addApplicants,
  setTotalCount,
  setTabRequestsCondition,
  resetLoadedData,
} = resumeSlice.actions
export default resumeSlice.reducer

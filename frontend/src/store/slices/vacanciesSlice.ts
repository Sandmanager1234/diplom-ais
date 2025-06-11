import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { VacanciesStore, Vacancy, VacancyStatus } from '../../types/vacancies'
import { vacanciesApi } from '../../services/vacanciesApi/vacanciesApi'
import { AppDispatch, AppStore } from '../index'
import { LoadingStatus } from '../data/models'
import { Condition } from 'pages/Resumes/components/SearchBar/constants/conditions'

const initialState: VacanciesStore = {
  vacancies: [],
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

export type ChangeVacancyStatusArgs = {
  id: string
  name: string
  camelCaseName: VacancyStatus
}

export const changeVacancyStatus = createAsyncThunk<
  void,
  ChangeVacancyStatusArgs,
  { dispatch: AppDispatch }
>(
  'resumes/changeApplicantStatus',
  async ({ id, name, camelCaseName }, { dispatch }) => {
    await vacanciesApi.editStatusVacancy(id, name)
    dispatch(setVacancyStatus({ id: id, status: camelCaseName }))
  }
)

export const loadMoreVacancies = createAsyncThunk<
  Vacancy[],
  void,
  { state: AppStore; dispatch: AppDispatch }
>(
  'vacancies/loadMoreVacancies',
  async (_, { getState, dispatch }) => {
    const pagination = getState().vacancies.pagination
    const tabRequests = getState().vacancies.tabRequests
    const { data } = await vacanciesApi.getVacancies({
      page: pagination.currentPage,
      size: 10,
      isFavourite: tabRequests.isFavourite,
      isPresentResponsibleHr: tabRequests.isPresentResponsibleHr,
    })
    dispatch(setTotalCount(data.totalElements))
    return data.content
  },
  {
    condition: (_, { getState }) => {
      const { vacancies, pagination, loadingStatus } = getState().vacancies
      return (
        loadingStatus !== 'pending' && vacancies.length < pagination.totalCount
      )
    },
  }
)

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacancies(state, action) {
      state.vacancies = action.payload
    },
    addVacancies(state, action) {
      state.vacancies = [...state.vacancies, ...action.payload]
    },
    setCurrentPage(state, action: { payload: number }) {
      state.pagination.currentPage = action.payload
    },
    setTotalCount(state, action: { payload: number }) {
      state.pagination.totalCount = action.payload
    },
    setVacancyStatus(
      state,
      action: {
        payload: {
          id: string
          status: VacancyStatus
        }
      }
    ) {
      state.vacancies.find(({ id }) => id === action.payload.id)!.status =
        action.payload.status
    },
    setTabRequestsCondition(state, action) {
      const prevTab = state.activeTab
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
      if (prevTab !== action.payload) {
        state.vacancies = []
        state.pagination.currentPage = 0
        state.pagination.totalCount = 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMoreVacancies.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.FULFILLED
        state.pagination.currentPage += 1
        state.vacancies = [...state.vacancies, ...action.payload]
      })
      .addCase(loadMoreVacancies.pending, (state) => {
        state.loadingStatus = LoadingStatus.PENDING
      })
      .addCase(loadMoreVacancies.rejected, (state) => {
        state.loadingStatus = LoadingStatus.REJECTED
      })
  },
})

export const {
  setTotalCount,
  setCurrentPage,
  setVacancyStatus,
  setTabRequestsCondition,
} = vacanciesSlice.actions

export default vacanciesSlice.reducer

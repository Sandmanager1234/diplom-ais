import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ResponsibleHr, Vacancy, VacancyStatus } from 'types/vacancies'
import { vacanciesApi } from 'services/vacanciesApi/vacanciesApi'

import { LoadingStatus } from '../data/models'
import { AppDispatch } from 'store'
import { ChangeVacancyStatusArgs } from 'store/slices/vacanciesSlice'
import { ResumeStatus } from '../../types'

type State = {
  vacancy: Vacancy | null
  LoadingStatus: LoadingStatus
}

type СhangeVacancyResponsibleHRArgs = {
  vacancyID: string
  newResponsibleHr: ResponsibleHr
}

const initialState: State = {
  vacancy: null,
  LoadingStatus: LoadingStatus.IDLE,
}

export const fetchVacancyById = createAsyncThunk(
  `vacancy/fetchVacancyById`,
  vacanciesApi.getVacanciesById
)

export const changeVacancyResponsibleHr = createAsyncThunk<
  void,
  СhangeVacancyResponsibleHRArgs,
  { dispatch: AppDispatch }
>(
  'vacancies/changeVacancyResponsibleHR',
  async ({ vacancyID, newResponsibleHr }, { dispatch }) => {
    await vacanciesApi.changeVacancyResponsible(
      vacancyID,
      newResponsibleHr.email
    )
    dispatch(setNewResponsibleHr({ newResponsibleHr }))
  }
)

export const editVacancyStatus = createAsyncThunk<
  void,
  ChangeVacancyStatusArgs,
  { dispatch: AppDispatch }
>(
  'vacancy/editVacancyStatus',
  async ({ id, name, camelCaseName }, { dispatch }) => {
    await vacanciesApi.editStatusVacancy(id, name)
    dispatch(setNewVacancyStatus({ status: camelCaseName }))
  }
)

export const currentVacancySlice = createSlice({
  name: 'currentVacancy',
  initialState,
  reducers: {
    setNewResponsibleHr(
      state,
      action: {
        payload: {
          newResponsibleHr: ResponsibleHr
        }
      }
    ) {
      state.vacancy!.responsibleHr = action.payload.newResponsibleHr
    },
    setNewVacancyStatus(
      state,
      action: {
        payload: {
          status: VacancyStatus
        }
      }
    ) {
      state.vacancy!.status === action.payload.status
    },
    setVacancyApplicantState(
      state,
      action: {
        payload: {
          id: string
          status: ResumeStatus
        }
      }
    ) {
      state.vacancy.applicants = [...state.vacancy.applicants.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item, state: action.payload.status
          }
        }
          return item
      })]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancyById.pending, (state) => {
        state.LoadingStatus = LoadingStatus.PENDING
      })
      .addCase(fetchVacancyById.fulfilled, (state, action) => {
        state.vacancy = action.payload
        state.LoadingStatus = LoadingStatus.FULFILLED
      })
      .addCase(fetchVacancyById.rejected, (state, action) => {
        state.LoadingStatus = LoadingStatus.REJECTED
        console.error(action.error)
      })
  },
})

export const { setNewResponsibleHr, setNewVacancyStatus, setVacancyApplicantState } =
  currentVacancySlice.actions

export default currentVacancySlice.reducer

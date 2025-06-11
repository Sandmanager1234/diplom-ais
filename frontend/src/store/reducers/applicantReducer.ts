import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Applicant, ApplicantCard } from 'services/resumesApi/models'
import { resumesApi } from 'services/resumesApi/resumesApi'
import { ChangeApplicantStatusArgs } from 'store/slices/resumeSlice'
import { AppDispatch } from 'store'
import { ResumeStatus } from 'types'
import { ResponsibleHr } from 'types/vacancies'
import { LoadingStatus } from '../data/models'

type State = {
  applicant: ApplicantCard | null
  loadingStatus: LoadingStatus
}

type ChangeApplicantResponsibleArgs = {
  applicantID: string
  newResponsibleHr: ResponsibleHr
}

const initialState: State = {
  applicant: null,
  loadingStatus: LoadingStatus.IDLE,
}

export const viewApplicant = createAsyncThunk(
  'applicant/viewApplicant',
  async (id: string) => resumesApi.setApplicantToViewed(id)
)

export const fetchApplicant = createAsyncThunk(
  `applicant/fetchApplicant`,
  async (id: string) => resumesApi.getApplicant(id)
)

export const editApplicantStatus = createAsyncThunk<
  void,
  ChangeApplicantStatusArgs,
  { dispatch: AppDispatch }
>(
  'resumes/editApplicantStatus',
  async ({ id, name, camelCaseName }, { dispatch }) => {
    await resumesApi.editStatusApplicant(id, name)
    dispatch(setApplicantState({ id: id, status: camelCaseName }))
  }
)

export const editApplicantResponsible = createAsyncThunk<
  void,
  ChangeApplicantResponsibleArgs,
  { dispatch: AppDispatch }
>(
  'resumes/editApplicantResponsible',
  async ({ applicantID, newResponsibleHr }, { dispatch }) => {
    await resumesApi.editApplicantResponsible(
      applicantID,
      newResponsibleHr.email
    )
    dispatch(setNewResponsible({ newResponsible: newResponsibleHr }))
  }
)

export const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setApplicantState(
      state,
      action: {
        payload: {
          id: string
          status: ResumeStatus
        }
      }
    ) {
      state.applicant!.vacancies = [...state.applicant.vacancies.map((item) => {
        if (item.vacancyApplicantId === action.payload.id) {
          return {
            ...item, status: action.payload.status
          }
          return
        }
      })]
    },
    setNewResponsible(
      state,
      action: {
        payload: {
          newResponsible: ResponsibleHr
        }
      }
    ) {
      state.applicant?.responsibleHr === action.payload.newResponsible
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicant.pending, (state) => {
        state.loadingStatus = LoadingStatus.PENDING
      })
      .addCase(fetchApplicant.fulfilled, (state, action) => {
        state.applicant = action.payload
        state.loadingStatus = LoadingStatus.FULFILLED
      })
      .addCase(fetchApplicant.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.REJECTED
        console.error(action.error)
      })
      .addCase(viewApplicant.rejected, (_, action) =>
        console.error(action.error)
      )
  },
})

export const { setApplicantState, setNewResponsible } = applicantSlice.actions
export default applicantSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { LoadingStatus } from 'store/data/models'

import { directoryApi } from 'services/directoryApi/directoryApi'
import { DIRECTORY_TYPES, ISuggestionsDTO } from 'services/models'

type State = {
  loadingStatus: LoadingStatus
  recipients: ISuggestionsDTO[]
  applicants: ISuggestionsDTO[]
}

const initialState: State = {
  loadingStatus: LoadingStatus.PENDING,
  recipients: [],
  applicants: [],
}

export const fetchRecipients = createAsyncThunk(
  `recipients/fetchRecipients`,
  async (url: string, { rejectWithValue }) => {
    try {
      return await directoryApi.getSuggest(url)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchApplicants = createAsyncThunk(
  `recipients/fetchApplicants`,
  async (url: string, { rejectWithValue }) => {
    try {
      return await directoryApi.getSuggest(url)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const participentsSlice = createSlice({
  name: 'participents',
  initialState,
  reducers: {
    clearRecipients(state) {
      state.recipients = []
    },
    clearApplicants(state) {
      state.applicants = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipients.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING
    }),
      builder.addCase(fetchRecipients.fulfilled, (state, action) => {
        state.recipients = action.payload[DIRECTORY_TYPES.USER]
        state.loadingStatus = LoadingStatus.FULFILLED
      }),
      builder.addCase(fetchRecipients.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.REJECTED
        console.error(action.payload)
      })

    builder.addCase(fetchApplicants.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING
    }),
      builder.addCase(fetchApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload[DIRECTORY_TYPES.APPLICANT]
        state.loadingStatus = LoadingStatus.FULFILLED
      }),
      builder.addCase(fetchApplicants.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.REJECTED
        console.error(action.payload)
      })
  },
})

export const { clearRecipients, clearApplicants } = participentsSlice.actions
export default participentsSlice.reducer

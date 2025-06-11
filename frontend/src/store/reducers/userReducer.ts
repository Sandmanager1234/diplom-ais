import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'

import { User } from 'services/models'
import { userApi } from 'services/userApi/userApi'

import { LoadingStatus } from '../data/models'

type State = {
  user: User | null
  LoadingStatus: LoadingStatus
}

const initialState: State = {
  user: null,
  LoadingStatus: LoadingStatus.PENDING,
}

export const fetchUser = createAsyncThunk(
  `user/fetchUser`,
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getUser()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchUser.pending, (state) => {
    state.LoadingStatus = LoadingStatus.PENDING
  }),
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.LoadingStatus = LoadingStatus.FULFILLED
    }),
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.LoadingStatus = LoadingStatus.REJECTED
      console.error(action.payload)
    })
})

export default userReducer

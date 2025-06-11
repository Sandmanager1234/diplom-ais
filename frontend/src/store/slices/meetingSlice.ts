import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IMeeting, ISuggestionsDTO } from 'services/models'

import { IUser } from '../../types/user'
import { meetingApi } from 'services/meetingApi/meetingApi'
import { AppDispatch } from '../index'

const initialState: {
  content: IMeeting[]
  currentDateCalendar: string
  profileHR: IUser
  countOfUnreadNotification: number
  selectedRecipients: ISuggestionsDTO[]
  selectedApplicant: ISuggestionsDTO[]
} = {
  content: [],
  currentDateCalendar: new Date().toString(),
  profileHR: {
    email: '',
    fio: '',
    telegram: '',
    mobilePhone: '',
    position: '',
  },
  countOfUnreadNotification: 0,
  selectedRecipients: [],
  selectedApplicant: [],
}

type fetchMeetingsArgs = {
  params: string
}

export const fetchMeetings = createAsyncThunk<
  void,
  fetchMeetingsArgs,
  { dispatch: AppDispatch }
>(`meetings/fetchMeetings`, async ({ params }, { dispatch }) => {
  await meetingApi
    .getMeeting(params)
    .then((res) => dispatch(setContentMeeting(res)))
})

export const meetingSlice = createSlice({
  name: 'meetings',
  initialState: initialState,
  reducers: {
    setContentMeeting(state, action) {
      state.content = action.payload
    },
    setCalendarDate(state, action) {
      state.currentDateCalendar = action.payload
    },
    setProfileHRMeeting(state, action) {
      state.profileHR = action.payload
    },
    setCountOfUnreadNotification(state, action) {
      state.countOfUnreadNotification = action.payload
    },
    addSelectedRecipients(state, action) {
      if (
        !state.selectedRecipients.find(
          (rec) => rec.code === action.payload.code
        )
      )
        state.selectedRecipients.push(action.payload)
    },
    setSelectedRecipients(state, action) {
      state.selectedRecipients = action.payload
    },
    setSelectedApplicant(state, action) {
      state.selectedApplicant.push(action.payload)
    },
    deleteSelectedRecipient(state, action) {
      state.selectedRecipients = state.selectedRecipients.filter(
        (item) => item.code !== action.payload
      )
    },
    deleteSelectedApplicant(state) {
      state.selectedApplicant = []
    },
    clearPatricipants(state) {
      state.selectedApplicant = []
      state.selectedRecipients = []
    },
  },

  // вызывает ошибки при переходе на страницу календаря
  extraReducers: (builder) => {
    builder.addCase(fetchMeetings.fulfilled, (state, action) => {
      const contentIds = new Set(state.content.map((item) => item.id))
      if (action.payload?.filter) {
        state.content = [
          ...state.content,
          ...action.payload.filter((item) => !contentIds.has(item.id)),
        ]
      }
    })
  },
})

export const {
  setContentMeeting,
  setCountOfUnreadNotification,
  setCalendarDate,
  setProfileHRMeeting,
  setSelectedApplicant,
  deleteSelectedApplicant,
  addSelectedRecipients,
  setSelectedRecipients,
  deleteSelectedRecipient,
  clearPatricipants,
} = meetingSlice.actions
export default meetingSlice.reducer

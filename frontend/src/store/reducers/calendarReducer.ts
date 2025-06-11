import { createSlice } from '@reduxjs/toolkit'
import { IMeeting, ISuggestionsDTO } from '../../services/models'

type State = {
  redactingMeeting?: IMeeting,
  redactingApplicant?: ISuggestionsDTO,
  redactingRecipients: ISuggestionsDTO[],
}

const initialState: State = {
  redactingMeeting: undefined,
  redactingApplicant: undefined,
  redactingRecipients: [],
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    changeRedactingMeeting: (state, action) => {
      state.redactingMeeting = action.payload
    },

    changeRedactingApplicant: (state, action) => {
      state.redactingApplicant = action.payload.event
    },

    changeRedactingRecipients: (state, action) => {
      state.redactingRecipients = action.payload.event
    }
  },
})

export const { changeRedactingMeeting, changeRedactingApplicant, changeRedactingRecipients } = calendarSlice.actions
export default calendarSlice.reducer
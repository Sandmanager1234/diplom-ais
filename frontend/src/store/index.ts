import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import resumeSlice from './slices/resumeSlice'
import dictionariesSlice from './slices/dictionariesSlice'
import createResumeSlice from './slices/createResumeSlice'
import favouritesSlice from './slices/favouritesSlice'
import filterResumeSlice from './slices/filterResumeSlice'
import taskSlice from './slices/taskSlice'
import { directoryStoreApi } from './api/directoryApi'
import resumeValidationSlice from './slices/resumeValidationSlice'
import meetingSlice from './slices/meetingSlice'
import notificationSlice from './slices/notificationSlice'
import userReducer from './reducers/userReducer'
import participentsSlice from './slices/participentsSlice'
import applicantReducer from './reducers/applicantReducer'
import vacanciesSlice from './slices/vacanciesSlice'
import currentVacancyReducer from './reducers/currentVacancyReducer'
import calendarReducer from './reducers/calendarReducer'
import taggedResumesReducer from './reducers/taggedResumesReducer'

const rootReducer = combineReducers({
  resumes: resumeSlice,
  directories: dictionariesSlice,
  createResume: createResumeSlice,
  favourites: favouritesSlice,
  filterResume: filterResumeSlice,
  validationResume: resumeValidationSlice,
  tasks: taskSlice,
  meetings: meetingSlice,
  notifications: notificationSlice,
  participents: participentsSlice,
  user: userReducer,
  applicant: applicantReducer,
  [directoryStoreApi.reducerPath]: directoryStoreApi.reducer,
  vacancies: vacanciesSlice,
  currentVacancy:currentVacancyReducer,
  calendar: calendarReducer,
  taggedResumes: taggedResumesReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(directoryStoreApi.middleware)
  },
})

export const setupStore = () => {
  return store
}

type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

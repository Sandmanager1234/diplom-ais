import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'
import { ResponsibleHr } from 'types/vacancies'
import { ITask } from 'services/taskApi/models'

type State = {
  content: ITask[]
  pagination: {
    number: number
    totalPages: number
    totalElements: number
    size: number
  }
  activeFilterTask: string
  sortTask: string
  profileHR: ResponsibleHr
  hrEmails: ResponsibleHr[]
}

const initialState: State = {
  content: [],
  pagination: {
    number: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10,
  },
  activeFilterTask: 'FRESHLY',
  sortTask: '',
  profileHR: {
    email: '',
    fio: '',
    telegram: '',
    mobilePhone: '',
    position: '',
    ldapName: '',
  },
  hrEmails: [],
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload
    },
    setPagination(state, action) {
      state.pagination = action.payload
    },
    setFilterTask(state, action) {
      state.activeFilterTask = action.payload
    },
    setSortTask(state, action) {
      state.sortTask = action.payload
    },
    setProfileHRTask(state, action) {
      state.profileHR = action.payload
    },
    setProfileEmailHR(state, action) {
      state.hrEmails = action.payload
    },
  },
})

export const {
  setContent,
  setPagination,
  setFilterTask,
  setSortTask,
  setProfileHRTask,
  setProfileEmailHR,
} = taskSlice.actions
export default taskSlice.reducer

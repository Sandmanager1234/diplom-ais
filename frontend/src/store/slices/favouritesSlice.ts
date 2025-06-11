import { createSlice } from '@reduxjs/toolkit'
import { IListFolderNames, TFavouriteContent } from '../../services/models'
import { TPagination, TSorting } from 'types'

export const ROOT_KEY = 'favourites'

const initialState: {
  data: TFavouriteContent[]
  sort: TSorting | null
  pagination: TPagination | null
  listFolderNames: IListFolderNames[]
  activeFilter: string
  emailsHR: []
  userEmail: string
} = {
  data: [],
  listFolderNames: [],
  sort: null,
  pagination: {
    number: 0,
    totalPages: 0,
    totalElements: 0,
    size: 20,
  },
  activeFilter: 'ALL',
  emailsHR: [],
  userEmail: '',
}

export const favouritesSlice = createSlice({
  name: ROOT_KEY,
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setPagination: (state, action) => {
      state.pagination = action.payload
    },
    setListFolder: (state, action) => {
      state.listFolderNames = action.payload
    },
    resetData: (state) => {
      state.data = []
    },
    setFilterFavourites(state, action) {
      state.activeFilter = action.payload
    },
    setEmailHR(state, action) {
      state.emailsHR = action.payload
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload
    },
  },
})

const { actions, reducer } = favouritesSlice

export const {
  setData,
  setPagination,
  setSort,
  setListFolder,
  resetData,
  setFilterFavourites,
  setEmailHR,
  setUserEmail,
} = actions

export default reducer

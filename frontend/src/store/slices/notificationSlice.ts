import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: [],
    pagination:{
      pageable: {
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        offset: 0,
        pageSize: 20,
        pageNumber: 0,
        unpaged: false,
        paged: true
      },
      last: true,
      number: 0,
      totalPages: 0,
      totalElements: 0,
      size: 20,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false
      },
      first: true,
      numberOfElements: 0,
      empty: false
    }
  },
  reducers: {
    setContent(state, action) {
      state.content = action.payload
    },
    setPagination(state, action){
      state.pagination = action.payload
    }
  },
})

export const { setContent, setPagination } = notificationSlice.actions
export default notificationSlice.reducer

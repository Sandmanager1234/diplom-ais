import { createSelector } from '@reduxjs/toolkit'

import { AppStore } from 'store'

const currentVacancyState = (state: AppStore) => state.currentVacancy

export const selectCurrentVacancy = createSelector(
  currentVacancyState,
  (state) => state.vacancy
)

export const selectLoadingSatusOfCurrentVacancy = createSelector(
  currentVacancyState,
  (state) => state.LoadingStatus
)

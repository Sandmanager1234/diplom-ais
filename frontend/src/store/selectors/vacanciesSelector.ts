import { createSelector } from "@reduxjs/toolkit";

import { AppStore } from "store";

const vacanciesState=(state:AppStore)=>state.vacancies

export const selectVacancies=createSelector(vacanciesState,state=>state.vacancies)

export const selectPagination=createSelector(vacanciesState,state=>state.pagination)

export const selectLoadingStatus=createSelector(vacanciesState,state=>state.loadingStatus)
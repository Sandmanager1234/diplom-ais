import { createSelector } from "@reduxjs/toolkit";

import { AppStore } from "store";

const participentsState=(state:AppStore)=>state.participents

export const selectResipients=createSelector(participentsState,state=>state.recipients)

export const selectApplicants=createSelector(participentsState,state=>state.applicants)

export const selectLoadingSatus=createSelector(participentsState,state=>state.loadingStatus)
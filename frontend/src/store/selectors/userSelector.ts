import { createSelector } from "@reduxjs/toolkit";

import { AppStore } from "store";

const userState=(state:AppStore)=>state.user

export const selectUser=createSelector(userState,state=>state.user)

export const selectLoadingSatus=createSelector(userState,state=>state.LoadingStatus)
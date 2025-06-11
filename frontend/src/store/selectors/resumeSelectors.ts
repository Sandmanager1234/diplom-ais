import { createSelector } from "@reduxjs/toolkit";
import { AppStore } from "store";

const resumeState = (state: AppStore) => state.resumes

export const selectApplicants = createSelector(resumeState, (state) => state.resumes);

export const selectApplicantById = createSelector([selectApplicants, (_, id: string) => id], (applicants, id: string) => applicants.find((a) => a.id === id))

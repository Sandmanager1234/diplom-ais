export enum STEP_NAME {
  PersonalData = 'PersonalData',
  Contacts = 'Contacts',
  Speciality = 'Speciality',
  WorkExperienceWrap = 'WorkExperienceWrap',
  EducationWrap = 'EducationWrap',
  LanguageWrap = 'LanguageWrap',
  AnotherInfo = 'AnotherInfo',
  Documents = 'Documents',
}

export type CreateResumeStep = {
  id: number
  step: STEP_NAME
  isVisited: boolean
  isActive: boolean
  isError: boolean
}

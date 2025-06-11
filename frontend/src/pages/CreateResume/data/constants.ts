import { CreateResumeStep, STEP_NAME } from "./models"

export const INITIAL_STATE_OF_RESUME_CREATION:CreateResumeStep[] = [
  {
    id: 0,
    step: STEP_NAME.PersonalData,
    isVisited: true,
    isActive: true,
    isError: false,
  },
  {
    id: 1,
    step: STEP_NAME.Contacts,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 2,
    step: STEP_NAME.Speciality,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 3,
    step: STEP_NAME.WorkExperienceWrap,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 4,
    step: STEP_NAME.EducationWrap,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 5,
    step: STEP_NAME.LanguageWrap,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 6,
    step: STEP_NAME.AnotherInfo,
    isVisited: false,
    isActive: false,
    isError: false,
  },
  {
    id: 7,
    step: STEP_NAME.Documents,
    isVisited: false,
    isActive: false,
    isError: false,
  },
]

export const CONTACTS_POSITION = {
  mobile_phone: 0,
  e_mail: 1,
  telegram: 2,
  whats_app: 3,
  vk: 4,
  habr: 5,
  linked_in: 6,
  git: 7,
}

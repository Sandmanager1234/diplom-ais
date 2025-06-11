export type ContactTypeLinks = {
  vk: string
  telegram: string
  whats_app: string
  linked_in: string
  git: string
  habr: string
  e_mail: string
}

export type ContactTypeIcons = {
  vk: JSX.Element
  telegram: JSX.Element
  whats_app: JSX.Element
  linked_in: JSX.Element
  git: JSX.Element
  habr: JSX.Element
  e_mail: JSX.Element
  mobile_phone: JSX.Element
}

export type SortResumeStatus = {
  id: number
  name: string
  title: string
  camelCaseName: ResumeStatus
}

export type ResumeOptions = { [key in ResumeStatus]: string }

export enum ResumeStatus {
  Communication = 'communication',
  Interview = 'interview',
  SendOffer = 'sendOffer',
  New = 'new',
  CheckSecurity = 'checkSecurity',
  Reject = 'reject',
  Exit = 'exit',
  Screening = 'screening',
  CustomerInterview = 'customerInterview',
}

export type PositionData = {
  description: string
  id: string
  value: string
}

type DirectoriesComment = {
  description: string
  value: string
}

export type RegionData = {
  description: string
  id: string
  value: string
}

export type CityData = {
  description: string
  id: string
  value: string
}

type DirectoriesMas = {
  comment: DirectoriesComment[]
  position: PositionData[]
  region: RegionData[]
  city: CityData[]
}

export type Glossary = {
  [key: string]: []
}

export type Directories = {
  mas: DirectoriesMas
  glossary: Glossary
}

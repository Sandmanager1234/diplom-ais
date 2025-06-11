import { Condition } from 'pages/Resumes/components/SearchBar/constants/conditions'
import { LoadingStatus } from '../store/data/models'
import {Applicants} from "../services/resumesApi/models";

export type ResponsibleHr = {
  email: string
  fio: string
  telegram: string
  mobilePhone: string
  position: string
  ldapName: string
}

export type Location = {
  id: string
  candidateCountry: string
  candidateRegion: string
  candidateCity: string
}

type Locations = Array<Location>

type Skill = {
  id: string
  skillName: string
}

type Skills = Array<Skill>

export enum VacancyStatus {
  Active = 'active',
  Archive = 'archive',
}

export type VacancyOptions = { [key in VacancyStatus]: string }

export type SortVacancyStatus = {
  id: number
  name: string
  title: string
  camelCaseName: VacancyStatus
}

type Grade = {
  id: string
  grade: string
}

type Grades = Array<Grade>

export type Vacancy = {
  id: string
  name: string
  position: string
  customer: string
  grades: Grades
  salary: number
  description: string
  status: VacancyStatus
  timeCreate: string
  responsibleHr: ResponsibleHr
  locations: Locations
  skills: Skills
  favourite: boolean
  currency: string
  grade: string
  applicants: Applicants
}

export type Pagination = {
  currentPage: number
  totalCount: number
}

export type VacanciesStore = {
  vacancies: Array<Vacancy>
  pagination: Pagination
  loadingStatus: LoadingStatus
  tabRequests: {
    isFavourite: boolean
    isPresentResponsibleHr: boolean
  }
  activeTab: Condition
}

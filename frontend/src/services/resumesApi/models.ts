import { ResumeStatus } from '../../types'
import { VacancyStatus } from '../../types/vacancies'
import { HR } from '../models'

export type ApplicantsData = {
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  content: Applicants
  number: number
  sort: Sort
  numberOfElements: number
  last: boolean
  empty: boolean
}

type Sort = {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

export interface ApplicantsVacancies {
  vacancyApplicantId: string
  state: string
  id: string
  position: string
  name: string
}

export interface ApplicantCard {
  vacancies: ApplicantsVacancies[]
  state: ResumeStatus
  id?: string | any
  status: ResumeStatus
  surname: string
  name: string
  patronym: string
  contacts: Contacts
  position: string
  age: number | null
  country: string,
  region: string,
  city: string,
  experiences: Experience[]
  generalExperience: number
  salary: number
  currency: string
  actions: Actions
  favourite: boolean
  timeCreate: string
}

export interface ApplicantGridCard {
  applicant: ApplicantCard
  responsibleHR: HR | null
  vacancyNumber: number
  createData?: string
}

export type Applicants = Array<ApplicantCard>

interface Actions {
  canAddToList: boolean
  canCheckSecurity: boolean
  canContact: boolean
  canCreate: boolean
  canDelete: boolean
  canDeleteFromList: boolean
  canEdit: boolean
  canFinishWork: boolean
  canImport: boolean
  canInitialStatus: boolean
  canInterview: boolean
  canOffer: boolean
  canRefuse: boolean
  canReject: boolean
  canResetStatus: boolean
  canSave: boolean
  canView: boolean
}

export type Contact = {
  id?: string
  type: string
  value: string
}

export type Contacts = Array<Contact>

export type ExperienceActivity = {
  activityName: string
  details: string[]
}

export interface Experience {
  id: string
  position: string
  companyName: string
  startDate: string
  endDate: string
  site: string
  description: string
  activity: ExperienceActivity
}

export type Experiences = Array<Experience>

export interface NotificationApplicant {
  content: NotificationContents
  pageable: {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface NotificationContent {
  id: string
  idApplicant: string
  applicantFio: string
  emailAuthor: string
  name: string
  comment: string
  isSent: boolean
  isViewed: boolean
  date: string
  timeCreate: string
  timeUpdate: string
  notificationSystems: {
    id: string
    idNotification: string
    notificationSource: 'SYSTEM' | 'EMAIL'
    timeCreate: string
    timeUpdate: string
  }[]
}

type NotificationContents = Array<NotificationContent>

type Vacancy = {
  status: VacancyStatus
  id: string
  position: string
  customer: string
  salary: string
  timeCreate: string
}

export type Vacancies = Array<Vacancy>

export type Applicant = {
  state: ResumeStatus
  id: string
  surname: string
  name: string
  patronym: string
  gender: string
  dateBirth: string
  country: string
  city: string
  region: string
  workPermit: boolean
  position: string
  grade: string
  salary: number
  currency: string
  relocation: 'impossible' | 'available' | 'desirable' | string
  isBusinessTrip: string
  comment: string
  typeLink: string
  isViewed: boolean
  version: number
  dateView: string
  timeCreate: string
  summaryExperience: number
  responsibleHr: HR | null
  skills: Skills
  contacts: Contacts
  languages: Languages
  education: Educations
  employments: Employments
  attachments: Attachments
  experiences: Experiences
  nationalities: Nationalities
  schedules: Schedules
  actions: Actions
  favourite: boolean
  vacancies: Vacancies
}

type Skill = {
  id: string
  skillName: string
}

type Skills = Array<Skill>

type Language = {
  id: string
  language: string
  level: string
  attribute: string
}

type Languages = Array<Language>

type Education = {
  id: string
  educationType: string
  universityName: string
  faculty: string
  specialization: string
  method: string
  organization: string
  endYear: number
}

type Educations = Array<Education>

export type Employment = {
  id: string
  employmentType: string
}

export type Employments = Array<Employment>

type Attachment = {
  id: string
  name: string
  extension: string
  content: Array<string>
  applicantId: string
}

type Attachments = Array<Attachment>

type Nationality = {
  id: string
  nationality: string
}

type Nationalities = Array<Nationality>

type Schedule = {
  id: string
  scheduleType: string
}

export type Schedules = Array<Schedule>

export enum RelocationEnum {
  Impossible = 'impossible',
  Available = 'available',
  Desirable = 'desirable',
}

export type RelocationType = { [key in RelocationEnum]: string }

export enum ScheduleEnum {
  FullDay = 'full_day',
  ShiftSchedule = 'shift_schedule',
  FlexibleSchedule = 'flexible_schedule',
  RemoteWork = 'remote_work',
  ShiftMethod = 'shift_method',
}

export type ScheduleType = { [key in ScheduleEnum]: string }

export enum ReadyForBusinessTripEnum {
  Never = 'never',
  Ready = 'ready',
  Sometimes = 'sometimes',
}

export type ReadyForBusinessTripType = {
  [key in ReadyForBusinessTripEnum]: string
}

export enum ContactType {
  mobilePhone = 'mobile_phone',
  email = 'e_mail',
  telegram = 'telegram',
  whatsApp = 'whats_app',
  vk = 'vk',
  habr = 'habr',
  linkedIn = 'linked_in',
  git = 'git',
}

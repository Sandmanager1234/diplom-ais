import {Applicant} from "./resumesApi/models";

type Author = {
  email: string
  fio: string
  isAuthor: boolean
}

type Coauthor = {
  fio: string
  email: string
  isCoauthorAccess: boolean
}

type Coauthors = Array<Coauthor>

export type TFavouriteContent = {
  id: string
  title: string
  applicants: Applicant
  isShared: boolean
  count: number
  author: Author
  coauthors: Coauthors
}

export interface IListFolderNames {
  id: string
  title: string
}

export interface User {
  email: string
  fio: string
  telegram: string
  mobilePhone: string
  position: string
}

export interface HR {
  email: string
  fio: string
  telegram: string
  mobilePhone: string
  position: string
  ldapName: string
}

export type HRs = Array<HR>

export enum DIRECTORY_TYPES {
  APPLICANT = 'APPLICANT',
  POSITION = 'POSITION',
  SKILL = 'SKILL',
  USER = 'USER',
}

type EntityFields = {
  e_mail: string
  mobile_phone: string
  position: string
}

export interface ISuggestionsDTO {
  code: string
  directoryType: DIRECTORY_TYPES
  entityFields: EntityFields | null
  value: string
  valueId: string
}

export interface IDirectoryType {
  [DIRECTORY_TYPES.APPLICANT]: ISuggestionsDTO[]
  [DIRECTORY_TYPES.POSITION]: ISuggestionsDTO[]
  [DIRECTORY_TYPES.SKILL]: ISuggestionsDTO[]
  [DIRECTORY_TYPES.USER]: ISuggestionsDTO[]
}

export interface IRecipient {
  id: string
  fullNameRecipient: string
  idMeeting?: string
  emailRecipient: string
  isViewMeeting?: boolean
  isStartMeeting?: boolean
}

export interface IMeeting {
  id: string
  name: string
  startDate: Date
  endDate: Date
  emailAuthor: string
  authorFio: string
  place: string
  comment: string
  isFullDay: boolean
  isOnline: boolean
  eventOutlook: boolean
  applicantId: string
  applicantFio: string
  recipient: IRecipient[]
}

export interface IGetMeetings {
  totalPages: number
  totalElements: number
  size: number
  content: {
    id: string
    name: string
    startDate: Date
    endDate: Date
    emailAuthor: string
    authorFio: string
    place: string
    comment: string
    isFullDay: boolean
    applicantId: string
    applicantFio: string
    emailRecipient: string[]
  }[]
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  pageable: {
    offset: number
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    paged: boolean
    unpaged: boolean
    pageNumber: number
    pageSize: number
  }
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export type PostMeetingData = {
  name: string
  startDate: string
  endDate: string
  emailAuthor: string
  authorFio: string
  place: string
  comment: string
  isFullDay: boolean
  isOnline: boolean
  eventOutlook: boolean
  applicantId: string
  applicantFio: string
  recipient: Omit<IRecipient, 'id'>[]
}

export type UpdateMeetingData = {
  id: string
  name: string
  startDate: string
  endDate: string
  emailAuthor: string
  authorFio: string
  place: string
  comment: string
  isFullDay: boolean
  isOnline: boolean
  eventOutlook: boolean
  applicantId: string
  applicantFio: string
  recipient: Omit<IRecipient, 'id'>[]
}

export type Schedule = {
  id: string
  scheduleType: ScheduleEnum
}

export enum ScheduleEnum {
  FullDay = 'full_day',
  ShiftSchedule = 'shift_schedule',
  FlexibleSchedule = 'flexible_schedule',
  RemoteWork = 'remote_work',
  ShiftMethod = 'shift_method',
}

export type ScheduleType = { [key in ScheduleEnum]: string }

export enum RelocationEnum {
  Impossible = 'impossible',
  Available = 'available',
  Desirable = 'desirable',
}

export type RelocationType = { [key in RelocationEnum]: string }

export enum ReadyForBusinessTripEnum {
  Never = 'never',
  Ready = 'ready',
  Sometimes = 'sometimes',
}

export type ReadyForBusinessTripType = {
  [key in ReadyForBusinessTripEnum]: string
}

export type Employment = {
  id: string
  employmentType: string
}

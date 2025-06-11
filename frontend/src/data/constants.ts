import {
  RelocationEnum,
  RelocationType,
  ScheduleEnum,
  ScheduleType,
} from 'services/resumesApi/models'

export const SCHEDULE: ScheduleType = {
  [ScheduleEnum.FullDay]: 'Полный день',
  [ScheduleEnum.FlexibleSchedule]: 'Гибкий график',
  [ScheduleEnum.ShiftMethod]: 'Вахтовый метод',
  [ScheduleEnum.RemoteWork]: 'Удалённая работа',
  [ScheduleEnum.ShiftSchedule]: 'Сменный график',
}

export const RELOCATION: RelocationType = {
  [RelocationEnum.Available]: 'возможен',
  [RelocationEnum.Desirable]: 'желателен',
  [RelocationEnum.Impossible]: 'невозможен',
}

export enum Directories {
  Language = 'language',
  Country = 'country',
  Region = 'region',
  City = 'city',
  Month = 'month',
  Skill = 'skill',
  Experience = 'experience',
  Currency = 'currency',
  Status = 'status',
  Gender = 'gender',
  Grade = 'grade',
  Position = 'position',
  SortType = 'sort-type',
  Comment = 'comment',
  ContactType = 'contact-type',
  EmploymentType = 'employment-type',
  EducationType = 'education-type',
  InteractionType = 'interaction-type',
  LanguageLevel = 'language-level',
  LoadingAttribute = 'loading-attribute',
  Applicant = 'applicant',
}

export const MINIMUM_SCROLLING_VALUE=600
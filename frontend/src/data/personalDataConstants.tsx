import { Icon } from 'UI'
import {
  ContactTypeIcons,
  ContactTypeLinks,
  ResumeOptions,
  SortResumeStatus,
  ResumeStatus,
} from '../types'

export const MAP_CONTACT_TYPE_TO_ICON: ContactTypeIcons = {
  vk: <Icon.Vk />,
  telegram: <Icon.Telegram />,
  whats_app: <Icon.WhatsApp />,
  linked_in: <Icon.LinkedIn />,
  git: <Icon.GitHub />,
  habr: <Icon.HeadHunter />,
  mobile_phone: <Icon.Phone />,
  e_mail: <Icon.Mail />,
} as const

export const MAP_CONTACT_TYPE_TO_LINK: ContactTypeLinks = {
  vk: '',
  telegram: 'https://t.me/',
  whats_app: 'https://wa.me/',
  linked_in: '',
  git: 'https://github.com/',
  habr: 'https://habr.com/ru/users/',
  e_mail: 'mailto:',
} as const

export const MAP_OPTION_TO_RESUME_STATUS: ResumeOptions = {
  [ResumeStatus.Communication]: 'Теплый контакт',
  [ResumeStatus.Interview]: 'Интервью ТН',
  [ResumeStatus.SendOffer]: 'Оффер',
  [ResumeStatus.New]: 'Первичный контакт',
  [ResumeStatus.CheckSecurity]: 'Проверка СБ',
  [ResumeStatus.Reject]: 'Отказ',
  [ResumeStatus.Exit]: 'Нанят',
  [ResumeStatus.CustomerInterview]: 'Интервью',
  [ResumeStatus.Screening]: 'Скрининг',
}

export const MAP_STATUS_TO_RESUME_COLOR: ResumeOptions = {
  [ResumeStatus.Communication]: '#FF9029',
  [ResumeStatus.Interview]: '#48C95F',
  [ResumeStatus.SendOffer]: '#00BDC9',
  [ResumeStatus.New]: '#9D70FF',
  [ResumeStatus.CheckSecurity]: '#FF5E7B',
  [ResumeStatus.Reject]: '#FF0000',
  [ResumeStatus.Exit]: '#1A7C47',
  [ResumeStatus.CustomerInterview]: '#6D29FF',
  [ResumeStatus.Screening]: '#2969FF',
}

export const MAP_STATUS_TO_UPPERCASE: ResumeOptions = {
  [ResumeStatus.Communication]: 'COMMUNICATION',
  [ResumeStatus.Interview]: 'INTERVIEW',
  [ResumeStatus.SendOffer]: 'SEND_OFFER',
  [ResumeStatus.New]: 'NEW',
  [ResumeStatus.CheckSecurity]: 'CHECK_SECURITY',
  [ResumeStatus.Reject]: 'REJECT',
  [ResumeStatus.Exit]: 'EXIT',
  [ResumeStatus.CustomerInterview]: 'CUSTOMER_INTERVIEW',
  [ResumeStatus.Screening]: 'SCREENING',
}

export const SORT_RESUME_STATUS: SortResumeStatus[] = [
  {
    id: 0,
    name: 'new',
    title: 'Стакан резюме',
    camelCaseName: ResumeStatus.New,
  },
  {
    id: 1,
    name: 'communication',
    title: 'Тёплый контакт',
    camelCaseName: ResumeStatus.Communication,
  },
  {
    id: 2,
    name: 'screening',
    title: 'Скрининг',
    camelCaseName: ResumeStatus.Screening,
  },
  {
    id: 3,
    name: 'interview',
    title: 'Интервью ТН',
    camelCaseName: ResumeStatus.Interview,
  },
  {
    id: 4,
    name: 'customer-interview',
    title: 'Интервью с заказчиком',
    camelCaseName: ResumeStatus.CustomerInterview,
  },
  {
    id: 5,
    name: 'check-security',
    title: 'Проверка СБ',
    camelCaseName: ResumeStatus.CheckSecurity,
  },
  {
    id: 6,
    name: 'send-offer',
    title: 'Оффер',
    camelCaseName: ResumeStatus.SendOffer,
  },
  {
    id: 7,
    name: 'exit',
    title: 'Нанят',
    camelCaseName: ResumeStatus.Exit,
  },
  {
    id: 8,
    name: 'reject',
    title: 'Отказ',
    camelCaseName: ResumeStatus.Reject,
  },
]

export const ACTIONS = {
  canAddToList: true,
  canCheckSecurity: 4,
  canContact: 0,
  canCreate: false,
  canDelete: false,
  canDeleteFromList: true,
  canEdit: true,
  canFinishWork: 6,
  canImport: false,
  canInitialStatus: 8,
  canInterview: 1,
  canOffer: 2,
  canRefuse: 5,
  canReject: 3,
  canResetStatus: 7,
  canSave: true,
  canView: true,
}

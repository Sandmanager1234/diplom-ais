import { Applicants } from 'services/resumesApi/models'
import { LoadingStatus } from '../store/data/models'
import { Condition } from 'pages/Resumes/components/SearchBar/constants/conditions'

type ResumeSorting = {
  name: string
  summaryExperience: string
  salary: string
}

type CurrentResume = {
  id: string
}

export type Pagination = {
  currentPage: number
  totalCount: number
}

export type Resumes = {
  activeMenu: boolean
  isModalWindowDelete: boolean
  resumes: Applicants
  sorting: ResumeSorting
  currentResume: CurrentResume
  favouriteListFolders: []
  pagination: Pagination
  loadingStatus: LoadingStatus
  tabRequests: {
    isFavourite: boolean
    isPresentResponsibleHr: boolean
  }
  activeTab: Condition
}

export type ListItem = {
  id: string
  idApplicant: string
  emailHr: string
  comment: string
  timeCreate: string
}

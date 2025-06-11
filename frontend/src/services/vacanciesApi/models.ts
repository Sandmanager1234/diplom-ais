import { Vacancy } from 'types/vacancies'

type Sort = {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

type Pageable = {
  pageNumber: number
  pageSize: number
  offset: number
  sort: Sort
  unpaged: boolean
  paged: boolean
}

export type VacanciesDto = {
  totalPages: number
  totalElements: number
  first: boolean
  pageable: Pageable
  size: number
  content: Vacancy[]
  number: number
  sort: Sort
  numberOfElements: number
  last: boolean
  empty: boolean
}

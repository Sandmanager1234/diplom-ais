import { TSorting } from './sorting'

export type TPagination = {
  offset?: number
  sort?: TSorting
  paged?: boolean
  unpaged?: boolean
  pageNumber?: number
  pageSize?: number
  size?: number
  number?: number
  totalElements?: number
  totalPages?: number
}

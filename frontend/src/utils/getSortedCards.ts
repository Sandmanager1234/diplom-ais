import { ApplicantCard } from 'services/resumesApi/models'
import { Vacancy } from 'types/vacancies'

export function getSortedCards<T extends Vacancy | ApplicantCard>(
  data: T[],
  flag: boolean
): T[] {
  if (!flag) {
    return data.toSorted((a, b) => {
      return Date.parse(a.timeCreate) - Date.parse(b.timeCreate)
    })
  }
  return data
}

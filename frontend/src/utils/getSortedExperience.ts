import { Experiences } from 'services/resumesApi/models'

export const getDescSortedExperiences = (experiences: Experiences) => {
  return experiences.toSorted(
    (a, b) => Date.parse(b.startDate) - Date.parse(a.startDate)
  )
}

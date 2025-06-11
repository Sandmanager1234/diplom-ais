import { SortVacancyStatus, VacancyOptions, VacancyStatus } from '../types/vacancies'

export const MAP_OPTION_TO_VACANCY_STATUS: VacancyOptions = {
  [VacancyStatus.Active]: 'Активная вакансия',
  [VacancyStatus.Archive]: 'Вакансия в архиве',
}

export const MAP_STATUS_TO_VACANCY_COLOR: VacancyOptions = {
  [VacancyStatus.Active]: '#48C95F',
  [VacancyStatus.Archive]: '#BEB6B9',
}

export const SORT_VACANCY_STATUS: Array<SortVacancyStatus> = [
  {
    id: 0,
    name: 'active',
    title: 'Открыта',
    camelCaseName: VacancyStatus.Active,
  },
  {
    id: 1,
    name: 'archive',
    title: 'Закрыта',
    camelCaseName: VacancyStatus.Archive,
  },
]

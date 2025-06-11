import { AxiosResponse } from 'axios'

import { APIWithToken } from '../api'

import { VacanciesDto } from './models'
import { Vacancy } from 'types/vacancies'

export const vacanciesApi = {
  async getVacancies(filterParams: {
    page?: number
    size?: number
    ids?: string
    isFavourite?: boolean
    isPresentResponsibleHr?: boolean
  }): Promise<AxiosResponse<VacanciesDto>> {
    return await APIWithToken.get<VacanciesDto>(`/vacancies`, {
      params: filterParams,
    })
  },
  async editStatusVacancy(vacancyId: string, status: string) {
    await APIWithToken.put(
      `/vacancies/${vacancyId}/to-${status}`,
      {},
      { withCredentials: true }
    )
  },
  async getInteractionsVacancy(vacancyId: string) {
    const { data } = await APIWithToken.get(
      `/vacancies/${vacancyId}/interactions`,
      { withCredentials: true }
    )
    return data
  },
  async getVacanciesById(id: string): Promise<Vacancy> {
    const { data } = await APIWithToken.get<Vacancy>(`/vacancies/${id}`)
    return data
  },
  async addInteractionsVacancy(vacancyId: string, body: string) {
    return await APIWithToken.post(
      `/vacancies/${vacancyId}/interactions`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  },
  async editInteractionsVacancy(historyId: string, body: string) {
    return await APIWithToken.put(
      `/vacancies/${historyId}/interactions`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  async addDocumentToVacancy(vacancyId: string, file: File) {
    return APIWithToken.post(`/documents/vacancy/upload/${vacancyId}`, file)
  },
  async deleteInteractionsVacancy(historyId: string) {
    const { data } = await APIWithToken.delete(
      `/vacancies/${historyId}/interactions`
    )
    return data
  },
  async addApplicantToVacancy(vacancyId: string, applicantId: string) {
    await APIWithToken.post(`/vacancies/${vacancyId}/add-applicant`, null, {
      params: { applicantId: applicantId },
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  },
  async changeVacancyResponsible(vacancyID: string, hrEmail: string) {
    await APIWithToken.put(`/vacancies/${vacancyID}/setHr`, hrEmail, {
      headers: { 'Content-Type': 'text/plain' },
      withCredentials: true,
    })
  },
}

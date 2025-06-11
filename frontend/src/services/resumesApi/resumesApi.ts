import { APIWithToken } from '../api'
import {
  Applicant,
  ApplicantCard,
  NotificationApplicant,
  ApplicantsData,
} from './models'
import { AxiosResponse } from 'axios'

export const resumesApi = {
  async getApplicants(filterParams: {
    page?: number
    size?: number
    ids?: string
    isFavourite?: boolean
    isPresentResponsibleHr?: boolean
    state?: string
  }): Promise<AxiosResponse<ApplicantsData>> {
    return await APIWithToken.get<ApplicantsData>(`/applicants`, {
      params: filterParams,
    })
  },
  async getApplicantsWithFilters(   parameters?: number) {
    return await APIWithToken.get<ApplicantsData>(`/applicants?${parameters}`)
  },

  async getApplicant(id: string) {
    return (await APIWithToken.get<Applicant>(`/applicants/${id}`)).data
  },
  async setApplicantToViewed(applicantId: string) {
    return await APIWithToken.put(`/applicants/${applicantId}/to-viewed`)
  },
  async deleteApplicant(id: string) {
    await APIWithToken.delete(`/applicants/${id}`)
  },
  async createApplicant(body: ApplicantCard) {
    await APIWithToken.post('/applicants', body, {
      withCredentials: true,
    })
  },
  async editApplicant(body: ApplicantCard) {
    return await APIWithToken.put('/applicants', body)
  },
  async getDocument(applicantId: string, documentId: string) {
    const { data } = await APIWithToken.get(
      `/applicants/${applicantId}/attachments/${documentId}?loadContent=true`,
      {
        withCredentials: true,
      }
    )
    return data
  },
  async editStatusApplicant(relationId: string, status: string) {
    await APIWithToken.put(
      `/applicant-vacancies/${relationId}/to-${status}`,
      {},
      { withCredentials: true }
    )
  },
  async addInteractionsApplicant(
    applicantId: string,
    hrEmail: string,
    body: string
  ) {
    return await APIWithToken.post(
      `/applicants/${applicantId}/interactions`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          hrEmail,
        },
      }
    )
  },
  async getInteractionsApplicant(applicantId: string) {
    const { data } = await APIWithToken.get(
      `/applicants/${applicantId}/interactions`,
      { withCredentials: true }
    )
    return data
  },
  async editInteractionsApplicant(historyId: string, body: string) {
    return await APIWithToken.put(
      `/applicants/${historyId}/interactions`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  async editApplicantResponsible(applicantID: string, hrEmail: string) {
    await APIWithToken.put(`/applicants/${applicantID}/setHr`, hrEmail, {
      headers: { 'Content-Type': 'text/plain' },
      withCredentials: true,
    })
  },
  async deleteInteractionsApplicant(historyId: string) {
    const { data } = await APIWithToken.delete(
      `/applicants/${historyId}/interactions`
    )
    return data
  },
  async getNotificationById(notificationId: string) {
    return await APIWithToken.get(`/applicants/notifications/${notificationId}`)
  },
  async getAllNotificationById(applicantId: string, params: string) {
    return await APIWithToken.get(
      `/applicants/notifications?idApplicant=${applicantId}${params}`
    )
  },
  async deleteNotificationById(id: string) {
    return await APIWithToken.delete(`/applicants/${id}/notifications`)
  },
  async postNotification(body: any) {
    return await APIWithToken.post(`/applicants/notifications`, body)
  },
  async putNotification(body: any) {
    return await APIWithToken.put(`/applicants/notifications`, body)
  },
  async getDocumentByIdApplicant(applicantId: string) {
    return await APIWithToken.get(`/applicants/${applicantId}/export`)
  },
  async addDocumentByIdApplicant(applicantId: string, file: File) {
    return await APIWithToken.post(
      `/documents/applicant/upload/${applicantId}`,
      file
    )
  },
  async getNotifications(params: string): Promise<NotificationApplicant> {
    return await APIWithToken.get(`/applicants/notifications${params}`)
  },
  async readNotificationById(notificationId: string) {
    return await APIWithToken.put(
      `/applicants/notifications/view/${notificationId}`
    )
  },
  async checkFileExists(relationShipId: string, fileType: string) {
    return await APIWithToken.get(
      `/documents/vacancy-applicant/exist/${relationShipId}/${fileType}`
    )
  },
  async readAllNotificationByUser() {
    return await APIWithToken.put(`/applicants/notifications/view`)
  },
  async getCountOfUnreadNotification() {
    return await APIWithToken.get('/applicants/notifications/unread')
  },
  async getApplicantsCount() {
    return await APIWithToken.get('/applicants/count')
  },
}

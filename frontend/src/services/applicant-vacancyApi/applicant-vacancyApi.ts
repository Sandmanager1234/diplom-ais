import { APIWithToken } from '../api'

export const applicantVacancyApi = {
  async addDocumentById(id: string, filetype: string, file: File) {
    return await APIWithToken.post(
      `/documents/vacancy-applicant/upload/${id}/${filetype}`,
      file
    )
  },
}

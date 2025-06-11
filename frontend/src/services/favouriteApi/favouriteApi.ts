import { APIWithToken } from '../api'

export const favouriteApi = {
  async editFavoriteApplicant(id: string, favourite: boolean) {
    return await APIWithToken.put(`favourite/applicant/${id}`, {
      favourite,
    })
  },
  async editFavoriteVacancy(id: string, favourite: boolean) {
    return await APIWithToken.put(`favourite/vacancy/${id}`, {
      favourite,
    })
  },
}

import axios from "axios"

const baseEndpoint = 'http://localhost:8000'

export const api = {
  async getVacancies(page=1, limit=20) {
    return await axios.get(`${baseEndpoint}/vacancies/api/v1/vacancies`, {
      params: {
        page: page,
        limit: limit
      }
    })
  },
  async getFilter(filter: string) {
    return await axios.get(`${baseEndpoint}/dictionary/api/v1/${filter}`)
  },
}
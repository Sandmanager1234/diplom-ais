import { APIWithToken } from '../api'

import { User, HRs } from '../models'

export const userApi = {
  async getUser(): Promise<User> {
    const { data } = await APIWithToken.get('/users/api/v1/users/current')
    return data
  },
  async getHRs(): Promise<HRs> {
    const { data } = await APIWithToken.get('/users/api/v1/users')
    return data
  },
}

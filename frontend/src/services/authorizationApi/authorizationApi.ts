import { APIForAuthorization } from '../api'
import {UserId} from "./models";

export const authorizationApi = {
  async logIn(username: string, password: string): Promise<UserId> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    const { data, status } = await APIForAuthorization.post('/login', formData)
    return { data, status }
  },
}

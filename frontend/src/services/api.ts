import axios from 'axios'
import { router } from '../router/router'

export const baseURL = process.env.API_URL
export const baseURLstat = process.env.API_URL_STAT

export const APIForAuthorization = axios.create({
  baseURL: `${baseURL}`,
})

export const APIWithToken = axios.create({
  baseURL: `${baseURL}`,
})

export const APIWithTokenStat = axios.create({
  baseURL: `${baseURLstat}`
})

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken')
}

const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken')
}

const postRefreshToken = () => {
  return APIForAuthorization.post('/auth/refresh', {
    refresh_token: getRefreshToken(),
  })
}

const tokenInterceptor = (config: any): any => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`
  return config
}

APIWithToken.interceptors.request.use(tokenInterceptor)
APIWithTokenStat.interceptors.request.use(tokenInterceptor)

let accessTokenPromise: Promise<any> | null = null
APIWithToken.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      if (!accessTokenPromise) {
        accessTokenPromise = postRefreshToken()
          .then((res) => {
            accessTokenPromise = null
            sessionStorage.setItem('accessToken', res.data.access_token)
            sessionStorage.setItem('refreshToken', res.data.refresh_token)
          })
          .catch((err: any) => {
            router.navigate('/login')
            sessionStorage.clear()
            return err
          })
      }

      return accessTokenPromise
        .then((token: any) => {
          error.config.headers['Authorization'] = `Bearer ${token}`
          return APIWithToken.request(error.config)
        })
        .catch((error: any) => {
          router.navigate('/login')
          return error
        })
    }
    console.error('Статус ошибки', error.response.status)
    console.error(error)
    return Promise.reject(error)
  }
)

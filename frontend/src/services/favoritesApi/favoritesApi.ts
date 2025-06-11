import { APIWithToken } from '../api'
import { AxiosResponse } from 'axios'
import { FavoritesFolder } from './models'

export const favoritesApi = {
  async getFavorites(params: string): Promise<any> {
    return (await APIWithToken.get(`favourites?${params}`)).data
  },
  async addNewListFavorites(name: string, isShared: boolean) {
    await APIWithToken.put(
      '/favourites',
      {
        title: name,
        isShared: isShared,
      },
      { withCredentials: true }
    )
  },
  async getFavoriteFolder(id: string): Promise<FavoritesFolder> {
    const { data } = await APIWithToken.get(`/favourites/${id}`)
    return data
  },
  async deleteFavoriteFolder(id: string): Promise<AxiosResponse> {
    return await APIWithToken.delete(`/favourites/${id}`)
  },
  async addApplicantToFavoriteFolder(
    idFolder: string,
    idApplicant: string
  ): Promise<AxiosResponse> {
    return await APIWithToken.put(`/favourites/${idFolder}/${idApplicant}`)
  },
  async deleteApplicantFromFavoriteFolder(
    idFolder: string,
    idApplicant: string
  ): Promise<AxiosResponse> {
    return await APIWithToken.delete(`/favourites/${idFolder}/${idApplicant}`)
  },
  async addCoauthorToFolder(idFolder: string, emailCoauthor: string) {
    return await APIWithToken.put(
      `/favourites/coauthors/${idFolder}/${emailCoauthor}`
    )
  },
  async deleteCoauthorToFolder(idFolder: string, emailCoauthor: string) {
    return await APIWithToken.delete(
      `/favourites/coauthors/${idFolder}/${emailCoauthor}`
    )
  },
  async editFavoriteFolder(body: FavoritesFolder) {
    return await APIWithToken.put(
      '/favourites',
      JSON.stringify({ ...body, coauthor: [] })
    )
  },
}

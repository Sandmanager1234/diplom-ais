import { IDirectoryType } from './../models';

import { APIWithToken } from '../api'

export const directoryApi = {
  async getDirectory(url: string) {
    return (await APIWithToken.get(`/directories/${url}/items`)).data
  },
  async getRegions(countryId: string) {
    return await APIWithToken.get(`/directories/countries/${countryId}/regions`)
  },
  async getCities(regionId: string) {
    return await APIWithToken.get(`/directories/regions/cities?${regionId}`)
  },
  async getSuggest(url: string) : Promise<IDirectoryType> {
    const {data}= await APIWithToken.get<IDirectoryType>(`/directories/suggestions?query=${url}`)
    return data
  },
}

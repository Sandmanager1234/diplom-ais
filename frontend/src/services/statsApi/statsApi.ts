import { AxiosResponse } from 'axios'
import { APIWithToken } from '../api'
import {IStats} from "./models";


export const statsApi = {
    async getFastFilters(): Promise<AxiosResponse<IStats>> {
        return APIWithToken.get('/stats/positions')
    },
    async getFastFiltersFavourites(): Promise<AxiosResponse<IStats>> {
        return APIWithToken.get('/stats/favourites')
    },
}
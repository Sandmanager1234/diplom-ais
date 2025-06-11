import {Applicant} from "../resumesApi/models";

export interface FavoritesFolder {
    id: string
    title: string
    isShared: boolean
    count: number
    author: {
        email: string
        fio: string
        isAuthor: boolean
    }
    coauthor: {
        fio: string
        email: string
        isCoauthorAccess: boolean
    }[]
    applicants: Applicant[]
}
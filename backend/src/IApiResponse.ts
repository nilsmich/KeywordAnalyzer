import { IKeyword } from '../types'

export interface IApiResponse {
    responseElements: IApiResponseElement[]
}

export interface IApiResponseElement {
    keyWord: string
    synonyms: IKeyword[]
}

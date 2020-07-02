import { IKeyword } from '../types'

export interface IApiResponse {
    responseElements: IApiResponseElement[]
}

export interface IApiResponseElement {
    keyword: string
    synonyms: IKeyword[]
}

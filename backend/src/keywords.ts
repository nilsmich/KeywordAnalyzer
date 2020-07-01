import {IKeyword} from '../types'
import { stopwordsDe } from './stopwords-de'

export const initKeywords = (words: string[]): IKeyword[] => {
  const uniqueKeyWords = words.filter((item, pos) => words.indexOf(item) === pos)

  return uniqueKeyWords.map(kw => {
    const keyword: IKeyword = {
      keyword: kw,
      normalizedTrend: undefined
    }

    return keyword
  })
}

export const tokenizeAndSanitize = (rawKeywords: string, separator: string): string[] => rawKeywords
  .replace(',', '')
  .replace('.', '')
  .replace(';', '')
  .replace('\'', '')
  .replace('"', '')
  .split(separator)
  .map(kw => kw.trim())
  .filter(kw => !!kw)

export const toRawKeywords = (keywords: IKeyword[]): string[] => {
  return keywords.map(kw => kw.keyword)
}

export const mapAveragesToKeywords = (averages: number[], keywords: IKeyword[]): IKeyword[] => {
  if (averages.length !== keywords.length) {
    throw Error('mapAveragesToKeywords arrays are not compatible: ' + averages.toString() + keywords.toString())
  }

  return keywords.map((kw, index) => {
    kw.normalizedTrend = averages[index]

    return kw
  })
}

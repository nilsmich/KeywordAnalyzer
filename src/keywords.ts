import {IKeyword} from '../types'

export const initKeywords = (rawKeywords: string): IKeyword[] => {
  const rawKWArray = rawKeywords
    .split('\n')
    .map(kw => kw.trim())
    .filter(kw => !!kw)

  const uniqueKeyWords = new Set(rawKWArray)

  return Array.from(uniqueKeyWords).map(kw => {
    const keyword: IKeyword = {
      keyword: kw,
      normalizedTrend: undefined
    }

    return keyword
  })
}

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

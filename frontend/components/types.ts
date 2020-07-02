export interface IKeywordSuggestion {
  keyword: string
  synonyms: IGoogleTrendsKW[]
}

export interface IGoogleTrendsKW {
  keyword: string
  normalizedTrend: number | null
}

export type UpdateAlternateSeoTerm = (newKeyword: string, arrIndex: number) => void


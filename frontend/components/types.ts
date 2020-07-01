export interface IKeywordSuggestion {
  selected: string
  keywords: IGoogleTrendsKW[]
}

export interface IGoogleTrendsKW {
  keyword: string
  normalizedTrend: number | null
}

export type OnChange = (newKeyword: string, arrIndex: number, googleTrendsKwIndex: number) => void


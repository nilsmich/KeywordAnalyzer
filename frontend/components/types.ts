export interface IKeywordSuggestion {
  selected: string
  keywords: IGoogleTrendsKW[]
}

export interface IGoogleTrendsKW {
  keyword: string
  normalizedTrend: number | null
}

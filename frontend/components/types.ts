export interface IKeywordSuggestion {
  keyword: string
  synonym: ISuggestion[]
}

export interface ISuggestion {
  suggestion: string
  normalizedTrend: number
}

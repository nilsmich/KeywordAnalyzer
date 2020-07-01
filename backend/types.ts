
export interface IKeyword {
  keyword: string
  normalizedTrend?: number
}
export interface IKeywordBatches {
  referenceKw: string
  batches: IKeyword[][]
}

export interface ITrends {
  timelineData: IDataPoint[]
  averagesRounded: number[]
}

interface IDataPoint {
  'time': string,
  'formattedTime': string,
  'formattedAxisTime': string,
  'value': number[],
  'hasData': boolean[],
  'formattedValue': string[]
}

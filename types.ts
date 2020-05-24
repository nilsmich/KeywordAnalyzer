
export interface IKeyword {
  keyword: string
  normalizedTrend?: number
}
export interface IKeywordBatches {
  referenceKw: IKeyword
  batches: IKeyword[][]
}

export interface ITrendsResultRaw {
  default: ITrends
}

export interface ITrends {
  timelineData: IDataPoint[]
  averages: number[]
}

interface IDataPoint {
  'time': string,
  'formattedTime': string,
  'formattedAxisTime': string,
  'value': number[],
  'hasData': boolean[],
  'formattedValue': string[]
}

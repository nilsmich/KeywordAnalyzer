// https://www.npmjs.com/package/google-trends-api#interestovertime

import * as googleTrends from 'google-trends-api'
import {mapAveragesToKeywords, toRawKeywords} from './keywords'
import {IKeyword, IKeywordBatches, ITrendsResultRaw} from '../types'

const dateNow = new Date(Date.now())
const date12MonthAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
console.log(date12MonthAgo)

const CONFIG = {
  hl: 'de',
  geo: 'DE',
  startTime: dateNow, // default: Date('2004-01-01')
  endTime: date12MonthAgo // default: Date(Date.now())

}
const BATCH_SIZE = 5 // GoogleTrends can only handle 5 at the time

export const callAllTrends = async (keywords: IKeyword[]) => {
  const batches: IKeywordBatches = batchKeywords(keywords)
  const batchAverages: number[][] = []

  for (const batch of batches.batches) {
    batchAverages.push(
      (await callTrendsApi([batches.referenceKw, ...batch])).averages
    )
  }

  const mergedAvgs = mergeTrendBatchAvgs(batchAverages)

  return mapAveragesToKeywords(mergedAvgs, keywords)
}

export const callTrendsApi = async (keywords: IKeyword[]) => {
  if (keywords.length <= 0 || keywords.length > 5) {
    throw new Error('wrong amount of query strings')
  }

  const rawKeywords = toRawKeywords(keywords)

  let resultString: string
  try {
    resultString = await googleTrends.interestOverTime({keyword: rawKeywords, ...CONFIG})
  } catch (e) {
    console.log('ERROR: ', e)
  }

  const results = JSON.parse(resultString) as ITrendsResultRaw

  return results.default
}

const batchKeywords = (keywords: IKeyword[]) => {
  const batches: IKeyword[][] = []
  const referenceKeyword = keywords[0]

  for (let i = 1; i < keywords.length;) {
    const endIndex = i + BATCH_SIZE - 1

    const batch = keywords.slice(i, endIndex)
    batches.push(batch)

    i = endIndex
  }

  return {
    referenceKw: referenceKeyword,
    batches
  } as IKeywordBatches
}

const mergeTrendBatchAvgs = (averages: number[][]) => {
  let result: number[] = averages[0]

  averages.slice(1).forEach((batch) => {
    result = mergeTrendBatchAvg(result, batch)
  })

  return result
}

const mergeTrendBatchAvg = (batchA: number[], batchB: number[]) => {
  // find normalise factor using the reference object at the first positoin
  const refA = batchA [0]
  const refB = batchB [0]
  const factor = refA / refB

  // apply normalisation
  batchB = batchB
    .slice(1)
    .map(avg => avg * factor)

  return [...batchA, ...batchB]
}

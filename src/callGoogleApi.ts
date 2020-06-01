// https://www.npmjs.com/package/google-trends-api#interestovertime

import * as googleTrends from 'mf-google-trends-api'
import {IKeyword, IKeywordBatches, ITrendsResultRaw} from '../types'
import {wait} from './helper'
import {mapAveragesToKeywords, toRawKeywords} from './keywords'

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
  const batches: IKeywordBatches = batchKeywords('zubehör pferde', keywords)
  const batchAverages: number[][] = []

  for (const batch of batches.batches) {
    const rawKeywords = toRawKeywords(batch)
    console.log('\n\n---------\nbatch index from api: ', batches.batches.indexOf(batch))
    console.log(rawKeywords)

    const apiBatchResult = await callTrendsApi([batches.referenceKw, ...rawKeywords])
    await wait(2000) // throttle API calls

    if (!apiBatchResult?.averages) {
      console.log('apiBatchResult', apiBatchResult)
    }

    batchAverages.push(
      apiBatchResult.averages
    )
  }

  const mergedAvgs = mergeTrendBatchAvgs(batchAverages)

  return mapAveragesToKeywords(mergedAvgs, keywords)
    .sort((a, b) => b.normalizedTrend - a.normalizedTrend)
}


export const callTrendsApi = async (keywords: string[]) => {
  if (keywords.length <= 0 || keywords.length > 5) {
    throw new Error('wrong amount of query strings')
  }

  try {
    let resultString: string
    resultString = await googleTrends.interestOverTime({keyword: keywords, ...CONFIG})
    console.log('ERROR on resultString: ', resultString)

    const results = JSON.parse(resultString) as ITrendsResultRaw
    console.log('ERROR on results: ', results)

    if (!results?.default?.averages || !results?.default?.timelineData) {
      return null
    }

    return results.default
  } catch (e) {
    console.log('ERROR on keyword batch: ', keywords)
    console.log('ERROR Message: ', e)
  }
}

export const batchKeywords = (referenceKeyword: string, keywords: IKeyword[]) => {
  const batches: IKeyword[][] = []

  for (let i = 0; i < keywords.length;) {
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

export const mergeTrendBatchAvgs = (averages: number[][]) => {
  let result: number[] = averages[0]

  averages.slice(1).forEach((batch) => {
    result = mergeTrendBatchAvg(result, batch)
  })

  return result.slice(1)  // remove reference items
}

const mergeTrendBatchAvg = (batchA: number[], batchB: number[]) => {
  // find normalise factor using the reference object at the first positoin
  const refA = batchA [0]
  const refB = batchB [0]

  if (refA === 0 || refB === 0) {
    throw new Error('Reference Items can not be 0')
  }

  const factor = refA / refB

  // apply normalisation
  batchB = batchB
    .slice(1)    // remove reference items
    .map(avg => avg * factor)

  return [...batchA, ...batchB]
}

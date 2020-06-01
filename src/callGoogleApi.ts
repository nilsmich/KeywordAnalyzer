// https://www.npmjs.com/package/google-trends-api#interestovertime

import {IKeyword, IKeywordBatches} from '../types'
import {wait} from './helper'
import {mapAveragesToKeywords, toRawKeywords} from './keywords'
import {gTrends} from './gtrends'

const BATCH_SIZE = 5 // GoogleTrends can only handle 5 at the time

export const callAllTrends = async (keywords: IKeyword[]) => {
  const batches: IKeywordBatches = batchKeywords('zubehör pferde', keywords)
  const batchAverages: number[][] = []

  for (const batch of batches.batches) {
    const rawKeywords = toRawKeywords(batch)
    console.log('\n\n---------\nbatch index from api: ', batches.batches.indexOf(batch))

    const apiBatchResult = await callTrendsApi([batches.referenceKw, ...rawKeywords])
    await wait(100) // throttle API calls

    if (!apiBatchResult?.averages) {
      console.log('apiBatchResult', apiBatchResult)
    }
    console.log([batches.referenceKw, ...rawKeywords])
    console.log(apiBatchResult.averages)
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

  // resultString = await googleTrends.interestOverTime({keyword: keywords, ...CONFIG})
  // const results = JSON.parse(resultString) as ITrendsResultRaw

  const results = await gTrends(keywords)

  if (!results?.averages || !results?.timelineData) {
    return null
  }

  return results
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

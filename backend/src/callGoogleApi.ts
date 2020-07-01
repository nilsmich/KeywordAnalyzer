// https://www.npmjs.com/package/google-trends-api#interestovertime

import {IKeyword, IKeywordBatches} from '../types'
import {calcAvg, wait} from './helper'
import {mapAveragesToKeywords, toRawKeywords} from './keywords'
import {gTrends} from './gtrends'

const BATCH_SIZE = 5 // GoogleTrends can only handle 5 at the time
const REFERENCE_KEYWORD = 'pferdesportartikel'

export const callAllTrends = async (keywords: IKeyword[]): Promise<IKeyword[]> => {
  const batches: IKeywordBatches = batchKeywords(REFERENCE_KEYWORD, keywords)
  const batchAverages: number[][] = []

  for (const batch of batches.batches) {
    const rawKeywords = toRawKeywords(batch)
    //console.log('\n\n---------\nbatch index from api: ', batches.batches.indexOf(batch))

    const apiBatchResult = await callTrendsApi([batches.referenceKw, ...rawKeywords])
    await wait(100) // throttle API calls

    if (!apiBatchResult?.averagesRounded) {
      console.log('apiBatchResult', apiBatchResult)
    }
    // console.log([batches.referenceKw, ...rawKeywords])
    // console.log(apiBatchResult.averagesRounded)

    batchAverages.push(
      calcAvg(apiBatchResult)
    )
  }

  const mergedAvgs = mergeTrendBatchAvgs(batchAverages)

  return mapAveragesToKeywords(mergedAvgs, keywords)
    // .sort((a, b) => b.normalizedTrend - a.normalizedTrend)
}


export const callTrendsApi = async (keywords: string[]) => {
  if (keywords.length <= 0 || keywords.length > 5) {
    throw new Error('wrong amount of query strings')
  }

  // resultString = await googleTrends.interestOverTime({keyword: keywords, ...CONFIG})
  // const results = JSON.parse(resultString) as ITrendsResultRaw

  const results = await gTrends(keywords)

  if (!results?.averagesRounded || !results?.timelineData) {
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

export const mergeTrendBatchAvgs = (averages: number[][]): number[] => {
  let result = new Array<number>()
  const removedRefernce = averages.map(batch => batch.slice(1))

  removedRefernce.forEach(batch => {
    result = [...result, ...batch]
  })

  return result
}
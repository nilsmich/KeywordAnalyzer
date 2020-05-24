import {IKeyword, IKeywordBatches, ITrends} from './types'
import * as fs from 'fs'


export const avg = (trends: ITrends) => {
  const dataPointCount = trends.timelineData.length
  const avgs: number[] = new Array(getQueryCount(trends)).fill(0)

  for (let trend of trends.timelineData) {
    trend.value.forEach((val, index) => {
      avgs[index] += val / dataPointCount
    })
  }

  return avgs
}

const getQueryCount = (trends: ITrends) => {
  return trends.timelineData[0].value.length
}

export const writeJson = async (json: object) => {
  await fs.writeFile('./trends.json', JSON.stringify(json, null, 2), 'utf8', () => {
    console.log('written results to file')
  })
}

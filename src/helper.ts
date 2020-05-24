import {promises as fs} from 'fs'
import {ITrends} from '../types'


export const avg = (trends: ITrends) => {
  const dataPointCount = trends.timelineData.length
  const avgs: number[] = new Array(getQueryCount(trends)).fill(0)

  for (const trend of trends.timelineData) {
    trend.value.forEach((val, index) => {
      avgs[index] += val / dataPointCount
    })
  }

  return avgs
}

const getQueryCount = (trends: ITrends) => {
  return trends.timelineData[0].value.length
}

export const writeJson = async (path: string, json: object) => {
  await fs.writeFile(path, JSON.stringify(json, null, 2), 'utf8')
  console.log('file was written')
}

export const readJson = async (path: string) => {
  const data = await fs.readFile(path, 'utf8')

  return JSON.parse(data)
}

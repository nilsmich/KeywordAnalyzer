import {callAllTrends} from './callGoogleApi'
import {writeJson} from './helper'
import {initKeywords} from './keywords'

const main = async () => {
  const keywords = initKeywords()
  const trends = (await callAllTrends(keywords))
    .sort((a, b) => b.normalizedTrend - a.normalizedTrend)


  writeJson(trends)
}

main()

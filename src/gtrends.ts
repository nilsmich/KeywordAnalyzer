import {ITrends} from '../types'
import {ExploreTrendRequest} from './lib/g-trends/index'

const geo = 'DE'

export const gTrends = async (keywords: string[]) => {
  const explorer = new ExploreTrendRequest()

  try {
    const req = explorer
      .past12Months() // could be made configurable

    keywords.forEach(kw => {
      req.addKeyword(kw, geo)
    })
    const data = await req.download()

    const str = data[1].toString()
    const json = JSON.parse(str).default

    // console.log('successfully fetched data from Google Trends Api. Keywords: ', keywords)
    return json as ITrends
  } catch (e) {
    console.log('[!] Failed fetching data from Google Trends Api for keywords: ', keywords, ' - Error message: ', e)
  }
}

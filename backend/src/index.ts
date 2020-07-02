import { IKeyword } from '../types'
import { callAllTrends } from './callGoogleApi'
import { getSynonyms } from './callOpenThesaurusApi'
import { IApiResponse, IApiResponseElement } from './IApiResponse'
import { ISynonyms } from './ISynonyms'
import { initKeywords, tokenizeAndSanitize } from './keywords'
import { stopwordsDe } from './stopwords-de'
import express = require('express')

const port = 8080

const main = async () => {
  const app = express()
  const cors = require('cors')

  app.get('/trends', cors(), async (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(await getTrends(req.query.text))
  })

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
  })
}

const getTrends = async (input: string): Promise<IApiResponse> => {
  const inputSentenceTokenized = tokenizeAndSanitize(input, ' ')
  const sourceTrends = initKeywords(inputSentenceTokenized)

  const synonyms = new Array<ISynonyms>()
  for (const kw of sourceTrends) {
    synonyms.push(await getSynonyms(kw.keyword))
  }

  for (const synonym of synonyms) {
    const synonymTrends = await callAllTrends(synonym.synonyms)
    for (const syn of synonym.synonyms) {
      syn.normalizedTrend = synonymTrends.filter(
        (st) => st.keyword === syn.keyword
      )[0].normalizedTrend
    }
  }

  return getApiResponse(sourceTrends, synonyms)
}

const getApiResponse = (
  sourceTrends: IKeyword[],
  synonyms: ISynonyms[]
): IApiResponse => {
  const responseElements = new Array<IApiResponseElement>()
  sourceTrends.forEach((sourceTrend) => {
    let responseElement
    if (stopwordsDe.includes(sourceTrend.keyword.toLowerCase())) {
      responseElement = {
        keyword: sourceTrend.keyword,
        synonyms: [],
      }
    } else {
      responseElement = {
        keyword: sourceTrend.keyword,
        synonyms: synonyms.filter((syn) => syn.word === sourceTrend.keyword)[0]
          .synonyms,
        // .filter(syn => syn.normalizedTrend > 0)
      }
    }
    responseElements.push(responseElement)
  })

  return {
    responseElements,
  }
}

main()

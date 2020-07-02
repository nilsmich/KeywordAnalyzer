import {callAllTrends} from './callGoogleApi'
import {initKeywords, tokenizeAndSanitize} from './keywords'
import { getSynonyms } from './callOpenThesaurusApi'
import { ISynonyms } from './ISynonyms'
import { IKeyword } from '../types'
import { IApiResponse, IApiResponseElement } from './IApiResponse'
import { stopwordsDe } from './stopwords-de'
import { writeJson } from './helper'
import express = require('express')

const inputSentence = 'Hallo, das ist ein Marketing text'
const port = 8080

const main = async () => {
  const app = express()

  app.get( '/trends', async ( req, res ) => {
    res.send( await getTrends(req.query.text) )
  })

  app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` )
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
      syn.normalizedTrend = synonymTrends.filter(st => st.keyword === syn.keyword)[0].normalizedTrend
    }
  }

  return getApiResponse(sourceTrends, synonyms)
}

const getApiResponse = (sourceTrends: IKeyword[], synonyms: ISynonyms[]): IApiResponse => {
  const responseElements = new Array<IApiResponseElement>()

  sourceTrends.forEach(sourceTrend => {
    let responseElement
    if(stopwordsDe.includes(sourceTrend.keyword.toLowerCase())){
      responseElement = {
        keyword: sourceTrend.keyword,
        synonyms: []
      }
    } else {
    responseElement = {
      keyWord: sourceTrend.keyword,
      synonyms: synonyms.filter(syn => syn.word === sourceTrend.keyword)[0].synonyms
    }
  }
    responseElements.push(responseElement)
  })

  return {
    responseElements
  }
}

main()

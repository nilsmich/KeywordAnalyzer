import {callAllTrends} from './callGoogleApi'
import {initKeywords, tokenizeAndSanitize} from './keywords'
import { getSynonyms } from './callOpenThesaurusApi'
import { ISynonyms } from './ISynonyms'
import { IKeyword } from '../types'
import { IApiResponse, IApiResponseElement } from './IApiResponse'
import { stopwordsDe } from './stopwords-de';
import { writeJson } from './helper';

const inputSentence = 'Hallo, das ist ein Marketing text'

const main = async () => {
  const inputSentenceTokenized = tokenizeAndSanitize(inputSentence, ' ')
  const sourceKeyWords = initKeywords(inputSentenceTokenized)
  const sourceTrends = (await callAllTrends(sourceKeyWords))

  const synonyms = new Array<ISynonyms>()
  for (const kw of sourceKeyWords) {
    synonyms.push(await getSynonyms(kw.keyword))
  }

  for (const synonym of synonyms) {
    const synonymTrends = await callAllTrends(synonym.synonyms)
    for (const syn of synonym.synonyms) {
      syn.normalizedTrend = synonymTrends.filter(st => st.keyword === syn.keyword)[0].normalizedTrend 
    }
  }

  const apiResponse = getApiResponse(sourceTrends, synonyms)
  writeJson('./out.json', apiResponse)
}

const getApiResponse = (sourceTrends: IKeyword[], synonyms: ISynonyms[]): IApiResponse => {
  const responseElements = new Array<IApiResponseElement>()

  sourceTrends.forEach(sourceTrend => {
    let responseElement
    if(stopwordsDe.includes(sourceTrend.keyword)){
      responseElement = {
        keyword: sourceTrend,
        synonyms: []
      }
    } else {
    responseElement = {
      keyWord: sourceTrend,
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

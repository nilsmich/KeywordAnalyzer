import 'isomorphic-unfetch'
import { ISynonyms } from './ISynonyms'
import { initKeywords } from './keywords'

export const getSynonyms = async (word: string): Promise<ISynonyms> => {
    const synonyms = new Array<string>()
    const apiResponse = (await fetch(`https://www.openthesaurus.de/synonyme/search?q=${word}&format=application/json`, {
      headers: { 'user-agent': 'galaxus.ch' }
    }))
    // tslint:disable-next-line: no-string-literal
    const termLists = (await apiResponse.json())['synsets'].map(synset => synset['terms'])
    termLists.forEach(termList =>
        termList.map(term =>
            synonyms.push(term.term.replace('(das) ', '').replace('(der) ', '').replace('(die) ', ''))))
    const synonymKeyWords = initKeywords(synonyms)

    return {
        word,
        synonyms: synonymKeyWords
    } as ISynonyms
  }

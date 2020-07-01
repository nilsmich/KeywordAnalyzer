import {FC, useEffect, useState} from 'react'
import {Keyword} from '../keyword/keyword'
import {IKeywordSuggestion} from '../types'
import style from './seoText.module.scss'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


export const SeoText: FC<ISeoText> = ({textObj}) => {
  // const [keywordSuggestions, setKeywordSuggestions] = useState(textObj)
  //
  // const onChange(newKeyword: IKeywordSuggestion, arrIndex: number) => {
  //   keywordSuggestions[arrIndex] = newKeyword
  // }

  return (
    <div className={style.textDisplayArea}>
      {textObj.map((word, index) => <Word kwSug={word} key={index + word.selected} />)}
    </div>)
}


interface IWord {
  kwSug: IKeywordSuggestion
}

const Word: FC<IWord> = ({kwSug}) => {
  if (kwSug.keywords.length > 0) {
    return <Keyword keywordSuggestion={kwSug} />
  }
  return <>{kwSug.selected} </>
}


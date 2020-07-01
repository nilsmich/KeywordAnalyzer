import {FC} from 'react'
import {Keyword} from '../keyword/keyword'
import {IKeywordSuggestion} from '../types'
import style from './seoText.module.scss'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


export const SeoText: FC<ISeoText> = ({textObj}) => {
  return (
    <div className={style.textDisplayArea}>
      {textObj.map((word, index) => <Word kwSugg={word} key={index + word.keyword} />)}
    </div>)
}


interface IWord {
  kwSugg: IKeywordSuggestion
}

const Word: FC<IWord> = ({kwSugg}) => {
  if (kwSugg.synonym.length > 0) {
    return <Keyword keywordSuggestion={kwSugg} />
  }
  return <>{kwSugg.keyword} </>
}


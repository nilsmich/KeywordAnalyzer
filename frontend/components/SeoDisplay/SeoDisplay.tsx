import {FC} from 'react'
import {Keyword} from '../keyword/keyword'
import {IKeywordSuggestion, OnChange} from '../types'
import style from './seoDisplay.module.scss'

interface ISeoText {
  textObj: IKeywordSuggestion[]
  onChange: OnChange
}


export const SeoDisplay: FC<ISeoText> = ({textObj, onChange}) => {


  return (
    <div className={style.textDisplayArea}>
      {textObj.map((word, index) =>
        <Word kwSug={word} arrIndex={index} key={index + word.selected} onChange={onChange} />
      )}
    </div>
  )
}

interface IWord {
  kwSug: IKeywordSuggestion
  arrIndex: number
  onChange: OnChange
}

const Word: FC<IWord> = ({kwSug, onChange, arrIndex}) => {
  if (kwSug.keywords.length > 0) {
    return <Keyword keywordSuggestion={kwSug} arrIndex={arrIndex} onChange={onChange} />
  }
  return <>{kwSug.selected} </>
}


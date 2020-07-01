import {FC, useState} from 'react'
import {Keyword} from '../keyword/keyword'
import {IKeywordSuggestion, OnChange} from '../types'
import style from './seoText.module.scss'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


export const SeoText: FC<ISeoText> = ({textObj}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState(textObj)

  const onChange: OnChange = (newKeyword: string, arrIndex: number, googleTrendsKwIndex: number) => {
    console.log(newKeyword, arrIndex, googleTrendsKwIndex)
    const updated = [...keywordSuggestions]
    updated[arrIndex].selected = newKeyword
    setKeywordSuggestions(updated)
  }

  return (
    <>
      <div className={style.textDisplayArea}>
        {keywordSuggestions.map((word, index) =>
          <Word kwSug={word} arrIndex={index} key={index + word.selected} onChange={onChange} />
        )}
      </div>
      <div>{toText(keywordSuggestions)}</div>
    </>)
}

const toText = (textObj: IKeywordSuggestion[]) => {
  return textObj.map(t => t.selected)
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


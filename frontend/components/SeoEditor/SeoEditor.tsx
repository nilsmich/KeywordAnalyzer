import {FC, useState} from 'react'
import {SeoDisplay} from '../SeoDisplay/SeoDisplay'
import {IKeywordSuggestion, OnChange} from '../types'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


export const SeoEditor: FC<ISeoText> = ({textObj}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState(textObj)

  const onChange: OnChange = (newKeyword: string, arrIndex: number) => {
    const updated = [...keywordSuggestions]
    updated[arrIndex].selected = newKeyword
    setKeywordSuggestions(updated)
  }

  return (
    <>
      <div>{toText(textObj)}</div>
      <SeoDisplay textObj={textObj} onChange={onChange} />
    </>)
}

const toText = (textObj: IKeywordSuggestion[]) => {
  return textObj.map(t => t.selected)
}

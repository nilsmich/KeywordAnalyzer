import React, {FC, useState} from 'react'
import {SeoDisplay} from '../SeoDisplay/SeoDisplay'
import {Textarea} from '../textarea/textarea'
import {IKeywordSuggestion, UpdateAlternateSeoTerm} from '../types'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


export const SeoEditor: FC<ISeoText> = ({textObj}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState(textObj)

  const updateAlternateSeoTerm: UpdateAlternateSeoTerm = (newlySelectedWord: string, termIndex: number) => {
    const updated = [...keywordSuggestions]
    updated[termIndex].selected = newlySelectedWord
    setKeywordSuggestions(updated)
  }

  return (
    <>
      <Textarea value={toText(keywordSuggestions)} />
      <SeoDisplay textObj={textObj} updateAlternateSeoTerm={updateAlternateSeoTerm} />
    </>)
}

const toText = (textObj: IKeywordSuggestion[]) => {
  return textObj.map(t => t.selected).join('')
}

import React, {FC, useState} from 'react'
import {SeoDisplay} from '../SeoDisplay/SeoDisplay'
import {Textarea} from '../textarea/textarea'
import {IKeywordSuggestion, UpdateAlternateSeoTerm} from '../types'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


// todo no params da diese aus der Text area kommen
export const SeoEditor: FC<ISeoText> = ({textObj}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState(textObj)

  const updateAlternateSeoTerm: UpdateAlternateSeoTerm = (newlySelectedWord: string, termIndex: number) => {
    const updated = [...keywordSuggestions]
    updated[termIndex].selected = newlySelectedWord
    setKeywordSuggestions(updated)
    copyToClipboard(newlySelectedWord)
  }
  const onChange = (text: string) => {
    console.log(text)
    // debounce
    // todo fetch API with text
    // replace textObj
  }

  return (
    <>
      <Textarea value={toText(keywordSuggestions)} onChange={onChange} />
      <SeoDisplay textObj={textObj} updateAlternateSeoTerm={updateAlternateSeoTerm} />
    </>)
}

const toText = (textObj: IKeywordSuggestion[]) => {
  return textObj.map(t => t.selected).join('')
}

const copyToClipboard = (newClip: string) => {
  navigator.clipboard.writeText(newClip).then(() => {
    console.log('coppied to clipboard')
  }, () => {
    console.log('copy to clipboard failed')
  })
}

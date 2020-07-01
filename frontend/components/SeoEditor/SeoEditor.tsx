import React, {FC, useEffect, useState} from 'react'
import {useDebouncedCallback} from 'use-debounce'
import {SeoDisplay} from '../SeoDisplay/SeoDisplay'
import {Textarea} from '../textarea/textarea'
import {IKeywordSuggestion, UpdateAlternateSeoTerm} from '../types'

interface ISeoText {
  textObj: IKeywordSuggestion[]
}


// todo no params da diese aus der Text area kommen
export const SeoEditor: FC<ISeoText> = ({textObj}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState(textObj) // initial val undefined
  const [text, setText] = useState('')


  const updateAlternateSeoTerm: UpdateAlternateSeoTerm = (newlySelectedWord: string, termIndex: number) => {
    const updated = [...keywordSuggestions]
    updated[termIndex].selected = newlySelectedWord
    setKeywordSuggestions(updated)
  }

  const [onChangeInputText] = useDebouncedCallback((value: string) => {
    setText(value)
    copyToClipboard(value)
  }, 1000)

  useEffect(() => {
    console.log('api call for: ', text)
    // call api here
    // set textObj here
  }, [text])


  return (
    <>
      <Textarea value={toText(keywordSuggestions)} onChange={onChangeInputText} />
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

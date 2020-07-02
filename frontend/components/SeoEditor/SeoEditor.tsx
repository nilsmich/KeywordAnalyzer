import React, {FC, useEffect, useState} from 'react'
import {useDebouncedCallback} from 'use-debounce'
import {copyToClipboard, toText} from '../../helper'
import {SeoDisplay} from '../SeoDisplay/SeoDisplay'
import {Textarea} from '../textarea/textarea'
import {IKeywordSuggestion, UpdateAlternateSeoTerm} from '../types'

interface ISeoText {
  initialText?: string
}

const API_ENDPOINT = 'http://localhost:8080/trends'
const DEBOUNCE_TIMEOUT = 500

// todo no params da diese aus der Text area kommen
export const SeoEditor: FC<ISeoText> = ({initialText}) => {
  const [keywordSuggestions, setKeywordSuggestions] = useState<IKeywordSuggestion[]>([])
  const [text, setText] = useState(initialText || '')

  const updateAlternateSeoTerm: UpdateAlternateSeoTerm = (newlySelectedWord: string, termIndex: number) => {
    const updated = [...keywordSuggestions]
    updated[termIndex].keyword = newlySelectedWord
    setKeywordSuggestions(updated)
  }

  const [onChangeInputText] = useDebouncedCallback((value: string) => {
    setText(value)
    copyToClipboard(value)
  }, DEBOUNCE_TIMEOUT)

  useEffect(() => {
    console.log('api call for: ', text)
    const callApi = async () => {
      const url = API_ENDPOINT + '?text=' + text
      const response = await fetch(url)
      const json = await (response.json())

      const keywordSuggestion: IKeywordSuggestion[] = json.responseElements
      setKeywordSuggestions(keywordSuggestion)
    }

    if (!!text) {
      callApi()
    }

  }, [text])


  return (
    <>
      <Textarea onChange={onChangeInputText}
                value={keywordSuggestions.length > 0 ? toText(keywordSuggestions) : text} />
      <SeoDisplay textObj={keywordSuggestions} updateAlternateSeoTerm={updateAlternateSeoTerm} />
    </>)
}


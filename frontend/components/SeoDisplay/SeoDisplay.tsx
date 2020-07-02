import {FC} from 'react'
import {toText} from '../../helper'
import {CopyButton} from '../button/copyButton'
import {Keyword} from '../keyword/keyword'
import {IKeywordSuggestion, UpdateAlternateSeoTerm} from '../types'
import style from './seoDisplay.module.scss'

interface ISeoText {
  textObj: IKeywordSuggestion[]
  updateAlternateSeoTerm: UpdateAlternateSeoTerm
}


export const SeoDisplay: FC<ISeoText> = ({textObj, updateAlternateSeoTerm}) => {


  const onChange = (arrIndex: number) => {
    return (newKeyword: string) => {
      updateAlternateSeoTerm(newKeyword, arrIndex)
    }
  }

  return (
    <div className={style.textDisplayArea}>
      {textObj.map((word, index) =>
        <Word kwSug={word} key={index.toString() + word.keyword} onChange={onChange(index)} />
      )}
      <CopyButton textToCopy={toText(textObj)} />
    </div>
  )
}

interface IWord {
  kwSug: IKeywordSuggestion
  onChange: (newKeyword: string) => void
}

const Word: FC<IWord> = ({kwSug, onChange}) => {
  if (kwSug.synonyms.length <= 0) {
    return <>{kwSug.keyword} </>
  }
  return <Keyword keywordSuggestion={kwSug} onChange={onChange} />
}


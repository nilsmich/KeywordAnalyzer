import {FC} from 'react'
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
        <Word kwSug={word} key={index.toString() + word.keyWord} onChange={onChange(index)} />
      )}
    </div>
  )
}

interface IWord {
  kwSug: IKeywordSuggestion
  onChange: (newKeyword: string) => void
}

const Word: FC<IWord> = ({kwSug, onChange}) => {
  console.log(kwSug)
  console.log(kwSug.synonyms.length)
  if (kwSug.synonyms.length <= 0) {

    // @ts-ignore
    return <>{kwSug.keyword} </>
  }
  return <Keyword keywordSuggestion={kwSug} onChange={onChange} />
}


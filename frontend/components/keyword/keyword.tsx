import {FC, useState} from 'react'
import {IKeywordSuggestion, ISuggestion} from '../types'
import style from './keyword.module.scss'

interface IKeyword {
  keywordSuggestion: IKeywordSuggestion
  // onChange: (newKeyword: string, index: number) => string // todo make this requirerd
}


export const Keyword: FC<IKeyword> = ({keywordSuggestion}) => {
  const [isHover, setIsHover] = useState(false)

  /* useEffect(()=> {
     console.log('isHover', isHover)
   }, [isHover])*/

  return (
    <span className={style.keyword} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {keywordSuggestion.keyword}
      {isHover && <Suggestion suggestions={keywordSuggestion.synonym} />}
    </span>)
}


interface ISuggestions {
  suggestions: ISuggestion[]
}

const Suggestion: FC<ISuggestions> = ({suggestions}) => {
  return <ul className={style.synonyms}>
    {suggestions.map((sug, index) =>
      <li key={index} onClick={() => {console.log(sug.suggestion)}}>
        {sug.suggestion}
        <span className={style.normalizedTrend}>{sug.normalizedTrend}</span>
      </li>
    )}
  </ul>
}

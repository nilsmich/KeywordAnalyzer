import {FC, useState} from 'react'
import {RelevanceMarker} from '../relevanceMarker/relevanceMarker'
import {IGoogleTrendsKW, IKeywordSuggestion} from '../types'
import style from './keyword.module.scss'

interface IKeyword {
  keywordSuggestion: IKeywordSuggestion
  onChange: (newKeyword: string) => void
}


export const Keyword: FC<IKeyword> = ({keywordSuggestion, onChange}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <span className={style.keyword} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {keywordSuggestion.keyWord}
      {isHover && <Suggestion suggestions={keywordSuggestion.synonyms} onChange={onChange} />}
    </span>)
}


interface ISuggestions {
  suggestions: IGoogleTrendsKW[]
  onChange: (newKeyword: string) => void
}

const Suggestion: FC<ISuggestions> = ({suggestions, onChange}) => {
  return <ul className={style.synonyms}>
    {suggestions.map((sug, index) =>
      <li key={index} onClick={() => {
        onChange(sug.keyword)
      }}>
        {sug.keyword}

        <RelevanceMarker normalizedTrend={sug.normalizedTrend || 0} />
      </li>
    )}
  </ul>
}

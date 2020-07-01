import {FC, useState} from 'react'
import {IGoogleTrendsKW, IKeywordSuggestion, OnChange} from '../types'
import style from './keyword.module.scss'

interface IKeyword {
  keywordSuggestion: IKeywordSuggestion
  arrIndex: number
  onChange: OnChange
}


export const Keyword: FC<IKeyword> = ({keywordSuggestion, arrIndex, onChange}) => {
  const [isHover, setIsHover] = useState(false)

  /* useEffect(()=> {
     console.log('isHover', isHover)
   }, [isHover])*/

  return (
    <span className={style.keyword} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {keywordSuggestion.selected}
      {isHover && <Suggestion suggestions={keywordSuggestion.keywords} arrIndex={arrIndex} onChange={onChange} />}
    </span>)
}


interface ISuggestions {
  suggestions: IGoogleTrendsKW[]
  onChange: OnChange
  arrIndex: number
}

const Suggestion: FC<ISuggestions> = ({suggestions, arrIndex, onChange}) => {
  return <ul className={style.synonyms}>
    {suggestions.map((sug, selectedIndex) =>
      <li key={selectedIndex} onClick={() => {
        onChange(sug.keyword, arrIndex, selectedIndex)
      }}>
        {sug.keyword}
        <span className={style.normalizedTrend}>{sug.normalizedTrend}</span>
      </li>
    )}
  </ul>
}

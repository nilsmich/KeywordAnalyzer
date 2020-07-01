import {FC, useState} from 'react'
import {IKeywordSuggestion, IGoogleTrendsKW} from '../types'
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
      {keywordSuggestion.selected}
      {isHover && <Suggestion suggestions={keywordSuggestion.keywords} />}
    </span>)
}


interface ISuggestions {
  suggestions: IGoogleTrendsKW[]
}

const Suggestion: FC<ISuggestions> = ({suggestions}) => {
  return <ul className={style.synonyms}>
    {suggestions.map((sug, index) =>
      <li key={index} onClick={() => {console.log(sug.keyword)}}>
        {sug.keyword}
        <span className={style.normalizedTrend}>{sug.normalizedTrend}</span>
      </li>
    )}
  </ul>
}

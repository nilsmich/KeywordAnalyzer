import {FC, useState} from 'react'
import {GoogleTrendsMarker} from '../relevanceMarker/googleTrendsMarker'
import {IGoogleTrendsKW, IKeywordSuggestion} from '../types'
import style from './keyword.module.scss'

interface IKeyword {
  keywordSuggestion: IKeywordSuggestion
  onChange: (newKeyword: string) => void
}


export const Keyword: FC<IKeyword> = ({keywordSuggestion, onChange}) => {
  const [isHover, setIsHover] = useState(false)

  const max = getMaxTrend(keywordSuggestion.synonyms)
  const keywordTrend = keywordSuggestion.synonyms.find(s => {
    return s.keyword.toLowerCase().trim() === keywordSuggestion.keyword.toLowerCase().trim()
  })

  const potential = (max - (keywordTrend?.normalizedTrend || 0)) / max

  return (
    <span className={style.keyword} style={{background: `rgba(254, 232, 193, ${potential})`}}
          onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {keywordSuggestion.keyword}
      {isHover && <Synonyms synonyms={keywordSuggestion.synonyms} onChange={onChange} />}
    </span>)
}


interface ISuggestions {
  synonyms: IGoogleTrendsKW[]
  onChange: (newKeyword: string) => void
}

const Synonyms: FC<ISuggestions> = ({synonyms, onChange}) => {
  const max = getMaxTrend(synonyms)

  return <ul className={style.synonyms}>
    {synonyms.map((sug, index) =>
      <li key={index} onClick={() => {
        onChange(sug.keyword)
      }}>
        {sug.keyword}

        <GoogleTrendsMarker normalizedTrend={normalizeMarker(max, sug.normalizedTrend)} />
      </li>
    )}
  </ul>
}

const getMaxTrend = (synonyms: IGoogleTrendsKW[]) => {
  let max = 0
  synonyms.forEach((s => {
    max = !!s.normalizedTrend && s.normalizedTrend > max ? s.normalizedTrend : max
  }))
  return max
}

const normalizeMarker = (max: number, normalizedTrend: number | null) => {
  return !!normalizedTrend ? normalizedTrend / max : 0
}

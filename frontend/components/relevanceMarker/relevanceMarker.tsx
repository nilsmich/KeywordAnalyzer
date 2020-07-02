import {FC} from 'react'
import style from './relevanceMarker.module.scss'

interface IRelevanceMarker {
  normalizedTrend: number
}


export const RelevanceMarker: FC<IRelevanceMarker> = ({normalizedTrend}) => {
  const widthPercent = normalizedTrend * 100

  return (
    <span className={style.markerContainer}>
      <span  className={style.marker} style={{width: widthPercent + '%'}} />
    </span>)
}

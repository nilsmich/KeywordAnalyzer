import {IKeyword} from '../types'

const keyworsRaw = `
 zubehör pferde
 reitsportgeschäfte
 reitsportartikel
 pferdezubehör
 pferdesachen
 reitsportzubehör
 reitsport zubehör
 reitsport geschäft
 reithelm online kaufen
 reiterladen
 reiterbedarf
 reitbedarf
 reitausrüstung
 fahrsport
 reitsport shops
 reitsport shop
 reitsport pferde
 reitshop
 reitsachen kaufen
 pferdezubehör kaufen
 pferdezubehör günstig
 pferdesachen kaufen
 pferde shop
 reitsportartikel online
 pferdesachen günstig
 pferde zubehör kaufen
 pferde online shop
 reitzubehör günstig
 reitshop online
 reitbedarf online
 pferdesportartikel
 pferdesachen günstig kaufen
 pferde onlineshop
 reitsportzubehör online shop
 reitsport zubehör shop
 reitsachen online kaufen
 reiterbedarf online
 reitartikel outlet
 online pferdeshop
 reitsport
 polo reitsport zubehör
  western zubehör
  reitzubehör
  reitsport zubehör
  reitsport online shop
  reitshop
  reitgeschäft
  reiterzubehör
  reitershops
  reiter zubehör
  reiter shop
  pferdezubehör kaufen
  pferdezubehör günstig
  pferdezubehör
  pferdesportartikel
  pferdesport
  pferdeshop
  pferde zubehör
  pferde shop
  pferde produkte
`


export const initKeywords = () => {
  const rawKWArray = keyworsRaw
    .split('\n')
    .map(kw => kw.trim())
    .filter(kw => !!kw)

  return rawKWArray.map(kw => {
    const keyword: IKeyword = {
      keyword: kw,
      normalizedTrend: undefined
    }

    return keyword
  })
}

export const toRawKeywords = (keywords: IKeyword[]) => {
  return keywords.map(kw => kw.keyword)
}

export const mapAveragesToKeywords = (averages: number[], keywords: IKeyword[]) => {
  if (averages.length !== keywords.length) {
    throw Error('mapAveragesToKeywords arrays are not compatible: ' + averages.toString() + keywords.toString())
  }

  return keywords.map((kw, index) => {
    kw.normalizedTrend = averages[index]

    return kw
  })
}

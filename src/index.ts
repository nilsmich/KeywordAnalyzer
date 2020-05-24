import {callAllTrends} from './callGoogleApi'
import {writeJson} from './helper'
import {initKeywords} from './keywords'

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

const main = async () => {
  const keywords = initKeywords(keyworsRaw)
  const trends = (await callAllTrends(keywords))

  console.log(trends)

  writeJson('./trends.json', trends)
}

main()

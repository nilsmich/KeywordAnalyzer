import {callAllTrends} from './callGoogleApi'
import {writeJson} from './helper'
import {initKeywords} from './keywords'

const keyworsRaw = `
zubehör pferde
western zubehör
reitzubehör günstig
reitzubehör
reitsportzubehör online shop
reitsportzubehör
reitsportgeschäfte
reitsportartikel online
reitsportartikel
reitsport zubehör shop
reitsport zubehör
reitsport zubehör
reitsport shops
reitsport shop
reitsport pferde
reitsport online shop
reitsport geschäft
reitsport
reitshop online
reitshop
reitshop
reitsachen online kaufen
reitsachen kaufen
reithelm online kaufen
reitgeschäft
reiterzubehör
reitershops
reiterladen
reiterbedarf online
reiterbedarf
reiter zubehör
reiter shop
reitbedarf online
reitbedarf
reitausrüstung
reitartikel outlet
polo reitsport zubehör
pferdezubehör kaufen
pferdezubehör kaufen
pferdezubehör günstig
pferdezubehör günstig
pferdezubehör
pferdezubehör
pferdesportartikel
pferdesportartikel
pferdesport
pferdeshop
pferdesachen kaufen
pferdesachen günstig kaufen
pferdesachen günstig
pferdesachen
pferde zubehör kaufen
pferde zubehör
pferde shop
pferde shop
pferde produkte
pferde onlineshop
pferde online shop
online pferdeshop
fahrsport
`

const main = async () => {
  const keywords = initKeywords(keyworsRaw)
  const trends = (await callAllTrends(keywords))

  console.log(trends)

  writeJson('./trends.json', trends)
}

main()

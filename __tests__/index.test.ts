import {callAllTrends} from '../src/callGoogleApi'
import {readJson} from '../src/helper'
import {initKeywords} from '../src/keywords'

describe('has Snapshot changed?', () => {
  it('Most Snapshots should be unchanged (this is a shit test as it depends on the google api results, but it is a quick and dirty indicator and I didnt feel like mocking gooel away)',  async () => {
   /* // given
    const trendsSnapshot = await readJson('./__tests__/trendsSnapshot.json')

    // when
    const keywords = initKeywords(rawKeywords)
    const trends = (await callAllTrends(keywords))
      .sort((a, b) => b.normalizedTrend - a.normalizedTrend)

    // then
    expect(trends).toStrictEqual(trendsSnapshot)*/
  },30000)
})

const rawKeywords = `
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

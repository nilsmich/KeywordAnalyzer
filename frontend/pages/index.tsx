import React from 'react'
import {Layout} from '../components/Layout/layout'
import {SeoEditor} from '../components/SeoEditor/SeoEditor'
import {IKeywordSuggestion} from '../components/types'

const testMock: IKeywordSuggestion[] = [
  {selected: 'Ich suche ein neues ', keywords: []},
  {
    selected: 'iPhone',
    keywords: [
      {keyword: 'iPhone', normalizedTrend: 100},
      {keyword: 'Smartphone', normalizedTrend: 200},
      {keyword: 'Android', normalizedTrend: 300}
    ]
  }
]


const IndexPage = () => (
  <Layout>
    <SeoEditor textObj={testMock} />
  </Layout>
)

export default IndexPage

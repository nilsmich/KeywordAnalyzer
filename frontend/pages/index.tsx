import {SeoText} from '../components/SeoText/SeoText'
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
  <SeoText textObj={testMock} />
)

export default IndexPage

import {SeoText} from '../components/SeoText/SeoText'
import {IKeywordSuggestion} from '../components/types'

const testMock: IKeywordSuggestion[] = [
  {keyword: 'Ich suche ein neues ', synonym: []},
  {
    keyword: 'iPhone', synonym: [
      {suggestion: 'Smartphone', normalizedTrend: 200},
      {suggestion: 'Android', normalizedTrend: 300}
    ]
  }
]


const IndexPage = () => (
  <SeoText textObj={testMock} />
)

export default IndexPage

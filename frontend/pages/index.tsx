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
    <h1>SEO Typewriter</h1>
    <SeoEditor textObj={testMock} />


    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h1>Präsentation</h1>
    <div>
      <h2>Features</h2>
      <ul>
        <li>Poweruser: Text wird wärend des schreibens ins Clipboard kopiert (spart Ctrl + C)</li>
        <li>Suche nach Synonymen für alle nicht Stopwörter</li>
        <li>Synonyme werden auf Google Trends nach Suchvolumen abgeglichen</li>
        <li>Visuell wird gezeigt welche Wörter grosses Potential haben, wenn man ein anderes Synonym verwendet</li>
        <li>Ist auf jeder Seite einbindbar (ERP, Alleinstehend, Frontend...) da es mit APIs umgesetzt ist und die
            Frontend Anzeige per copy paste eingebunden werden können
        </li>
        <li>debounced um unnötige Requests zu vermeiden</li>
      </ul>

      <h2>Wo gibt es einen Nutzen für dieses Tool / wie kann es verwendet werden</h2>
      <ul>
        <li>
          Überall wo Texte verfasst werden, welche SEO relevant sind
          <ul>
            <li>Redaktion</li>
            <li>Digitales Marketing</li>
            <li>Category Management</li>
          </ul>
        </li>
        <li>
          Beispiele
          <ul>
            <li>Kategoriebeschreibungen / Titel</li>
            <li>Frage welche Synonyme sollte hinter einem Product Type stehen?</li>
            <li>Marketing Pages</li>
          </ul>
        </li>
      </ul>

      <h2>Potentiale</h2>
      <ul>
        <li>Bessere Synonyme</li>
        <li>Stopwords verwalten</li>
        <li>Ähnliche Wörter von Google einbinden</li>
        <li>Competition (wie viel Konkrurrenz gibt es zu einem Wort?)</li>
      </ul>
    </div>
  </Layout>
)

export default IndexPage

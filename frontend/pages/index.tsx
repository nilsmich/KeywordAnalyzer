import React from 'react'
import {Layout} from '../components/Layout/layout'
import {SeoEditor} from '../components/SeoEditor/SeoEditor'

const IndexPage = () => (
  <Layout>
    <br />
    <h1>SEO Typewriter</h1>
    <br />
    <br />
    <SeoEditor initialText={'Ich suche ein neues Natel'} />
  </Layout>
)

export default IndexPage

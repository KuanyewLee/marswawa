import * as React from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import MintDisplay from '../components/mintDisplay'
import {mintDisplay} from "./index.module.css"

const IndexPage = () => {
  return (
    <Layout>
      <Header/>
      <MintDisplay style={mintDisplay}/>
    </Layout>
  )
}

export default IndexPage

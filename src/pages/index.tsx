import * as React from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import MintDisplay from '../components/mintDisplay'
import {mintDisplay} from "./index.module.css"

const IndexPage = () => {
  return (
    <Layout>
      <Header></Header>
      <MintDisplay style={mintDisplay}></MintDisplay>
    </Layout>
  )
}

export default IndexPage
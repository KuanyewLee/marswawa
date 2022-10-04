import * as React from 'react'
import Header from '../components/header'
import Layout from '../components/layout'
import MintDisplay from '../components/mintDisplay'
import {mintDisplay} from "./index.module.css"
import {useState} from "react";

export enum ConnectState {
  Connect, Switch, Connected
}

const IndexPage = () => {
  const [state, setState] = useState<ConnectState>(ConnectState.Connect);
  const [address, setAddress] = useState("");

  return (
    <Layout>
      <Header state={state} setState={setState}
              address={address} setAddress={setAddress}/>
      <MintDisplay className={mintDisplay} state={state} address={address}/>
    </Layout>
  )
}

export default IndexPage

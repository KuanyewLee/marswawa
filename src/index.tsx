import * as React from 'react'
import Header from './components/header'
import Layout from './components/layout'
import MintDisplay from './components/mintDisplay'
import style from "./index.module.css"
import {useState} from "react";
import ReactDOM from 'react-dom/client';
import "./css/common.css";

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
      <MintDisplay className={style.mintDisplay} state={state} address={address}/>
    </Layout>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<IndexPage/>)


import React, {useState} from "react";
import style from "./header.module.css"
import {StringUtils} from "../utils/StringUtils";
import {ChainDetail, ChainId, ethereum, web3} from "../contracts/chain";
import {ConnectState} from "../index";
import metamask from "../images/metaMask.png"

type Params = {
  state: ConnectState
  setState: (val: ConnectState) => void
  address: string
  setAddress: (val: string) => void
}

const Header = ({state, setState, address, setAddress}: Params) => {

  const connect = async () => {
    console.log("Connect", ethereum)
    if (!ethereum) window.location.href = "https://metamask.io/download/";
    else {
      const accounts: string[] = await ethereum.request({method: 'eth_requestAccounts'});
      const chainId: number = await web3.eth.getChainId();

      setAddress(accounts[0]);
      setState(chainId == ChainId ?
        ConnectState.Connected : ConnectState.Switch);
    }
  }
  const switch_ = async () => {
    try {
      await ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: web3.utils.toHex(ChainId)}],
      });
    } catch (switchError) {
      await ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [ChainDetail],
      });
      await ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: web3.utils.toHex(ChainId)}],
      });
    }
    const chainId: number = await web3.eth.getChainId();
    setState(chainId == ChainId ?
      ConnectState.Connected : ConnectState.Switch);
  }
  const disconnect = () => {
    setAddress("");
    setState(ConnectState.Connect);
  }

  const text =
    state == ConnectState.Connect ? "Connect" :
    state == ConnectState.Switch ? "Switch" :
      StringUtils.displayAddress(address);
  const onClick =
    state == ConnectState.Connect ? connect :
      state == ConnectState.Switch ? switch_ :
        disconnect;

  return (
    <div className={style.container}>
      <div className={style.button} onClick={() => onClick?.()}>
        {/*<StaticImage className={buttonIcon} src={metamaskUrl} alt={"MetaMask"}/>*/}
        <img className={style.buttonIcon} src={metamask}/>
        <span className={style.buttonText}>{text}</span>
      </div>
    </div>
  )
}

export default Header

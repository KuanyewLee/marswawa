import React from "react";
import style from "./header.module.css";
import { StringUtils } from "../utils/StringUtils";
import { ChainDetail, ChainId, ethereum, web3 } from "../contracts/chain";
import { ConnectState } from "../index";
import metamask from "../images/metaMask.png";
const Header = ({ state, setState, address, setAddress }) => {
    const connect = async () => {
        console.log("Connect", ethereum);
        if (!ethereum)
            window.location.href = "https://metamask.io/download/";
        else {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await web3.eth.getChainId();
            setAddress(accounts[0]);
            setState(chainId == ChainId ?
                ConnectState.Connected : ConnectState.Switch);
        }
    };
    const switch_ = async () => {
        console.log("Switch", ChainId, ChainDetail);
        try {
            await ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(ChainId) }],
            });
        }
        catch (switchError) {
            await ethereum?.request({
                method: 'wallet_addEthereumChain',
                params: [ChainDetail],
            });
            await ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(ChainId) }],
            });
        }
        const chainId = await web3.eth.getChainId();
        setState(chainId == ChainId ?
            ConnectState.Connected : ConnectState.Switch);
    };
    const disconnect = () => {
        setAddress("");
        setState(ConnectState.Connect);
    };
    const text = state == ConnectState.Connect ? "Connect" :
        state == ConnectState.Switch ? "Switch" :
            StringUtils.displayAddress(address);
    const onClick = state == ConnectState.Connect ? connect :
        state == ConnectState.Switch ? switch_ :
            disconnect;
    return (React.createElement("div", { className: style.container },
        React.createElement("div", { className: style.button, onClick: () => onClick?.() },
            React.createElement("img", { className: style.buttonIcon, src: metamask }),
            React.createElement("span", { className: style.buttonText }, text))));
};
export default Header;

import React from "react";
import { container, button, buttonIcon, buttonText } from "./header.module.css";
import { StaticImage } from "gatsby-plugin-image";
import { StringUtils } from "../utils/StringUtils";
import { ChainDetail, ChainId, ethereum, web3 } from "../contracts/chain";
import { ConnectState } from "../pages";
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
    return (React.createElement("div", { className: container },
        React.createElement("div", { className: button, onClick: () => onClick?.() },
            React.createElement(StaticImage, { className: buttonIcon, src: "../images/metaMask.png", alt: "MetaMask" }),
            React.createElement("span", { className: buttonText }, text))));
};
export default Header;

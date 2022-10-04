import * as React from 'react';
import Header from './components/header';
import Layout from './components/layout';
import MintDisplay from './components/mintDisplay';
import style from "./index.module.css";
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import "./css/common.css";
export var ConnectState;
(function (ConnectState) {
    ConnectState[ConnectState["Connect"] = 0] = "Connect";
    ConnectState[ConnectState["Switch"] = 1] = "Switch";
    ConnectState[ConnectState["Connected"] = 2] = "Connected";
})(ConnectState || (ConnectState = {}));
const IndexPage = () => {
    const [state, setState] = useState(ConnectState.Connect);
    const [address, setAddress] = useState("");
    return (React.createElement(Layout, null,
        React.createElement(Header, { state: state, setState: setState, address: address, setAddress: setAddress }),
        React.createElement(MintDisplay, { className: style.mintDisplay, state: state, address: address })));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(IndexPage, null));

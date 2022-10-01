import React from "react";
import {container, connectWallet} from "./header.module.css"

const Header = ({ style }: any) => {
    return (
        <div className={container + " " + style}>
            <button className={connectWallet}>连接钱包</button>
        </div>
    )
}

export default Header
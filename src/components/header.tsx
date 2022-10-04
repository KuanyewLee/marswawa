import React from "react";
import {container, button, buttonIcon, buttonText} from "./header.module.css"
import {StaticImage} from "gatsby-plugin-image";

const Header = () => {
    return (
        <div className={container}>
          <div className={button}>
            <StaticImage className={buttonIcon} src={"../images/metaMask.png"} alt={"MetaMask"}/>
            {/*<img src={require("../images/metaMask.png")}/>*/}
            <span className={buttonText}>Connect</span>
          </div>
        </div>
    )
}

export default Header

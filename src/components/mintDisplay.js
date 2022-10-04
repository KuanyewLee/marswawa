import React, { useEffect, useState } from "react";
import { container, mainCard, mainTitle, subTitle, mintButton, disabled, times, value, time, label } from "./mintDisplay.module.css";
import { DateUtils } from "../utils/DateUtils";
import { getContract } from "../contracts/contract";
import { web3 } from "../contracts/chain";
export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;
export const StartTime = new Date(2022, 9, 8, 14).getTime();
export var Stage;
(function (Stage) {
    Stage[Stage["Pending"] = 0] = "Pending";
    Stage[Stage["OGMint"] = 1] = "OGMint";
    Stage[Stage["WLMint"] = 2] = "WLMint";
    Stage[Stage["PublicSale"] = 3] = "PublicSale";
    Stage[Stage["Publish"] = 4] = "Publish";
})(Stage || (Stage = {}));
export const StageTexts = ["Pending", "OG Mint", "WL Mint", "Public Sale", "Sale Out"];
const MintDisplay = ({ className, address, state }) => {
    const [restTime, setRestTime] = useState(StartTime - Date.now());
    const [stage, setStage] = useState(Stage.Pending);
    const [price, setPrice] = useState(0.00777);
    const [maxFreeMint, setMaxFreeMint] = useState(1600);
    const [maxSupply, setMaxSupply] = useState(3333);
    const [curSupply, setCurSupply] = useState(0);
    const [maxMint, setMaxMint] = useState(1);
    const [lastTime, setLastTime] = useState(Date.now() / 1000);
    const [balance, setBalance] = useState(0);
    const [isOG, setIsOG] = useState(false);
    const [isWL, setIsWL] = useState(false);
    const isMinted = balance == maxMint;
    const isWLMint = stage == Stage.OGMint || stage == Stage.WLMint;
    const isSaleOut = isWLMint ? curSupply >= maxFreeMint :
        stage == Stage.PublicSale ? curSupply >= maxSupply : false;
    const isMintEnable = !isSaleOut &&
        (stage == Stage.OGMint ? isOG :
            stage == Stage.WLMint ? isWL :
                stage == Stage.PublicSale);
    async function init() {
        const contract = await getContract();
        const data = {
            Stage: await contract.methods.getStage().call(),
            Price: web3.utils.fromWei(await contract.methods.PublicPrice().call()),
            MaxFreeMint: await contract.methods.FreeMintCount().call(),
            MaxSupply: await contract.methods.MaxSupply().call(),
            CurSupply: await contract.methods.totalSupply().call(),
            MaxMint: await contract.methods.MaxMint().call(),
            LastTime: await contract.methods.lastTime().call(),
            IsOG: address ? await contract.methods.isOG(address).call() : "0",
            IsWL: address ? await contract.methods.isWL(address).call() : "0",
            Balance: address ? await contract.methods.balanceOf(address).call() : "0"
        };
        console.log("data", data);
        // Object.keys(data).forEach(
        //   key => eval(`set${key}(Number(${data[key]}))`))
    }
    useEffect(() => { init().then(); }, []);
    useEffect(() => {
        setTimeout(() => {
            let time = 0, now = Date.now();
            switch (stage) {
                case Stage.Pending:
                    time = StartTime - now;
                    break;
                case Stage.OGMint:
                case Stage.WLMint:
                    time = lastTime * Second + 3 * Hour - now;
                    break;
            }
            setRestTime(time);
        }, 1000);
    }, [restTime]);
    const [days, hours, minutes, seconds] = DateUtils.diff2Time(restTime);
    const timeItem = { days, hours, minutes, seconds };
    const clock = React.createElement("div", { className: times }, Object.keys(timeItem).map(key => {
        let str = timeItem[key].toString();
        if (key != "days")
            str = str.padStart(2, "0");
        return React.createElement("div", { className: time },
            React.createElement("div", { className: value }, str),
            React.createElement("div", { className: label }, key));
    }));
    return (React.createElement("div", { className: container + " " + className },
        React.createElement("div", { className: mainCard }, stage == Stage.Publish ?
            React.createElement("div", { className: mainTitle }, "Sale Out") :
            stage == Stage.PublicSale ?
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: subTitle },
                        React.createElement("strong", null, StageTexts[stage])),
                    React.createElement("div", { className: mainTitle },
                        curSupply,
                        "/",
                        maxSupply)) :
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: subTitle },
                        React.createElement("strong", null, StageTexts[stage])),
                    clock,
                    stage != Stage.Pending && React.createElement("div", { className: subTitle },
                        "Progress: ",
                        stage == Stage.OGMint || stage == Stage.WLMint ?
                            `${curSupply}/${maxFreeMint}` : `${curSupply}/${maxSupply}`))),
        React.createElement("div", { className: mintButton + " " + (!isMintEnable && disabled) },
            stage == Stage.OGMint ? "OG " : stage == Stage.WLMint ? "WL " : "",
            "Mint (",
            balance,
            "/",
            maxMint,
            ")")));
};
export default MintDisplay;

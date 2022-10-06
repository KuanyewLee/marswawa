import React, { useEffect, useState } from "react";
import style from "./mintDisplay.module.css";
import { DateUtils } from "../utils/DateUtils";
import { ConnectState } from "../index";
import { getContract } from "../contracts/contract";
import { web3 } from "../contracts/chain";
export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;
export const StartTime = new Date(2022, 9, 8, 20).getTime();
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
    const [isLoading, setIsLoading] = useState(false);
    const [stage, setStage] = useState(Stage.Pending);
    const [price, setPrice] = useState(0.00777);
    const [maxFreeMint, setMaxFreeMint] = useState(1600);
    const [maxSupply, setMaxSupply] = useState(3333);
    const [curSupply, setCurSupply] = useState(0);
    const [maxMint, setMaxMint] = useState(1);
    const [reverseCount, setReserveCount] = useState(200);
    const [lastTime, setLastTime] = useState(Date.now() / 1000);
    const [ogCount, setOGCount] = useState(0);
    const [wlCount, setWLCount] = useState(0);
    const [mintCount, setMintCount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isOG, setIsOG] = useState(false);
    const [isWL, setIsWL] = useState(false);
    async function refreshData() {
        const contract = await getContract();
        const data = {
            Stage: await contract.methods.getStage().call(),
            Price: web3.utils.fromWei(await contract.methods.PublicPrice().call()),
            MaxFreeMint: await contract.methods.FreeMintCount().call(),
            MaxSupply: await contract.methods.MaxSupply().call(),
            CurSupply: await contract.methods.totalSupply().call(),
            MaxMint: await contract.methods.MaxMint().call(),
            ReserveCount: await contract.methods.ReserveCount().call(),
            OGCount: await contract.methods.ogCount().call(),
            WLCount: await contract.methods.wlCount().call(),
            MintCount: await contract.methods.mintCount().call(),
            LastTime: await contract.methods.lastTime().call(),
        };
        console.log("data", data);
        Object.keys(data).forEach(key => eval(`set${key}(Number(${data[key]}))`));
    }
    async function refreshUserData() {
        const contract = await getContract();
        const data = {
            IsOG: address ? await contract.methods.isOG(address).call() : "0",
            IsWL: address ? await contract.methods.isWL(address).call() : "0",
            Balance: address ? await contract.methods.balanceOf(address).call() : "0"
        };
        console.log("data", data);
        Object.keys(data).forEach(key => eval(`set${key}(Number(${data[key]}))`));
    }
    async function doMint() {
        if (!isMintEnable)
            return;
        try {
            setIsLoading(true);
            const contract = await getContract();
            switch (stage) {
                case Stage.OGMint:
                    await contract.methods.ogMint(1).send({ from: address });
                    break;
                case Stage.WLMint:
                    await contract.methods.wlMint(1).send({ from: address });
                    break;
                case Stage.PublicSale:
                    const value = web3.utils.toWei(String(price));
                    await contract.methods.mint(1).send({ from: address, value });
                    break;
                default: return;
            }
            await refreshData();
            await refreshUserData();
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => { refreshData().then(); }, []);
    useEffect(() => { refreshUserData().then(); }, [address]);
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
            if (time <= 0)
                refreshData().then();
            setRestTime(time);
        }, restTime < 0 ? 3000 : 1000);
    }, [restTime]);
    const isMinted = balance == maxMint;
    const isWLMint = stage == Stage.OGMint || stage == Stage.WLMint;
    const isSaleOut = isWLMint ? curSupply >= maxFreeMint :
        stage == Stage.PublicSale ? curSupply >= maxSupply : false;
    const isMintEnable = state == ConnectState.Connected &&
        !isLoading && !isMinted && !isSaleOut &&
        (stage == Stage.OGMint ? isOG :
            stage == Stage.WLMint ? isWL :
                stage == Stage.PublicSale);
    const [days, hours, minutes, seconds] = DateUtils.diff2Time(restTime);
    const timeItem = { days, hours, minutes, seconds };
    const clock = React.createElement("div", { className: style.times }, Object.keys(timeItem).map(key => {
        let str = Math.max(0, timeItem[key]).toString();
        if (key != "days")
            str = str.padStart(2, "0");
        return React.createElement("div", { className: style.time },
            React.createElement("div", { className: style.value }, str),
            React.createElement("div", { className: style.label }, key));
    }));
    const curMintCount = maxSupply - reverseCount - mintCount;
    return (React.createElement("div", { className: style.container + " " + className },
        React.createElement("div", { className: style.mainCard }, stage == Stage.Publish ?
            React.createElement("div", { className: style.mainTitle }, "Sale Out") :
            stage == Stage.PublicSale ?
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: style.subTitle },
                        React.createElement("strong", null, StageTexts[stage])),
                    React.createElement("div", { className: style.mainTitle },
                        curSupply,
                        "/",
                        maxSupply)) :
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: style.subTitle },
                        React.createElement("strong", null, StageTexts[stage])),
                    clock,
                    stage != Stage.Pending && React.createElement("div", { className: style.subTitle },
                        "Progress: ",
                        stage == Stage.OGMint || stage == Stage.WLMint ?
                            `${curMintCount}/${maxFreeMint}` : `${curMintCount}/${maxSupply}`))),
        React.createElement("div", { className: style.mintButton + " " + (!isMintEnable && style.disabled), onClick: doMint },
            stage == Stage.OGMint ? "OG " : stage == Stage.WLMint ? "WL " : "",
            isLoading ? "Minting" : "Mint",
            " (",
            balance,
            "/",
            maxMint,
            ")")));
};
export default MintDisplay;

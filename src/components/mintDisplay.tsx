import React, { useEffect, useState } from "react";
import style from "./mintDisplay.module.css"
import { DateUtils } from "../utils/DateUtils";
import {ConnectState} from "../index";
import {getContract} from "../contracts/contract";
import {web3} from "../contracts/chain";

export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;

export const StartTime = new Date(2022, 9, 8, 14).getTime();

export enum Stage {
  Pending, OGMint, WLMint, PublicSale, Publish
}

export const StageTexts = ["Pending", "OG Mint", "WL Mint", "Public Sale", "Sale Out"];

type Params = {
  className: string
  address: string
  state: ConnectState
}

const MintDisplay = ({ className, address, state }: Params) => {

  const [restTime, setRestTime] = useState(StartTime - Date.now());
  const [isLoading, setIsLoading] = useState(false);

  const [stage, setStage] = useState<Stage>(Stage.Pending);
  const [price, setPrice] = useState(0.00777);
  const [maxFreeMint, setMaxFreeMint] = useState(1600);
  const [maxSupply, setMaxSupply] = useState(3333);
  const [curSupply, setCurSupply] = useState(0);
  const [maxMint, setMaxMint] = useState(1);
  const [lastTime, setLastTime] = useState(Date.now() / 1000);

  const [balance, setBalance] = useState(0);
  const [isOG, setIsOG] = useState(false);
  const [isWL, setIsWL] = useState(false);

  async function refreshData() {
    const contract = await getContract();

    const data: Record<string, string> = {
      Stage: await contract.methods.getStage().call(),
      Price: web3.utils.fromWei(await contract.methods.PublicPrice().call()),
      MaxFreeMint: await contract.methods.FreeMintCount().call(),
      MaxSupply: await contract.methods.MaxSupply().call(),
      CurSupply: await contract.methods.totalSupply().call(),
      MaxMint: await contract.methods.MaxMint().call(),

      LastTime: await contract.methods.lastTime().call(),
    }
    console.log("data", data);
    Object.keys(data).forEach(
      key => eval(`set${key}(Number(${data[key]}))`))
  }

  async function refreshUserData() {
    const contract = await getContract();

    const data: Record<string, string> = {
      IsOG: address ? await contract.methods.isOG(address).call() : "0",
      IsWL: address ? await contract.methods.isWL(address).call() : "0",
      Balance: address ? await contract.methods.balanceOf(address).call() : "0"
    }
    console.log("data", data);
    Object.keys(data).forEach(
      key => eval(`set${key}(Number(${data[key]}))`))
  }

  async function doMint() {
    if (!isMintEnable) return;
    try {
      setIsLoading(true)
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
          await contract.methods.mint(1).send({from: address, value});
          break;
        default: return;
      }
      await refreshData();
      await refreshUserData();
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {refreshData().then()}, []);
  useEffect(() => {refreshUserData().then()}, [address]);

  useEffect(() => {
    setTimeout(() => {
      let time = 0, now = Date.now();
      switch (stage) {
        case Stage.Pending: time = StartTime - now; break;
        case Stage.OGMint:
        case Stage.WLMint:
          time = lastTime * Second + 3 * Hour - now; break;
      }
      setRestTime(time)
    }, 1000);
  }, [restTime]);

  const isMinted = balance == maxMint;
  const isWLMint = stage == Stage.OGMint || stage == Stage.WLMint;
  const isSaleOut =
    isWLMint ? curSupply >= maxFreeMint :
      stage == Stage.PublicSale ? curSupply >= maxSupply : false;
  const isMintEnable = state == ConnectState.Connected &&
    !isLoading && !isMinted && !isSaleOut &&
    (stage == Stage.OGMint ? isOG :
      stage == Stage.WLMint ? isWL :
        stage == Stage.PublicSale);

  const [days, hours, minutes, seconds] = DateUtils.diff2Time(restTime);
  const timeItem: any = { days, hours, minutes, seconds };

  const clock = <div className={style.times}>
    {Object.keys(timeItem).map(key => {
      let str: string = timeItem[key].toString();
      if (key != "days") str = str.padStart(2, "0");
      return <div className={style.time}>
        <div className={style.value}>{str}</div>
        <div className={style.label}>{key}</div>
      </div>;
    })}
  </div>

  return (
    <div className={style.container + " " + className}>
      <div className={style.mainCard}>
        {stage == Stage.Publish ?
          <div className={style.mainTitle}>Sale Out</div> :
          stage == Stage.PublicSale ?
            <>
              <div className={style.subTitle}><strong>{StageTexts[stage]}</strong></div>
              <div className={style.mainTitle}>{curSupply}/{maxSupply}</div>
            </> :
            <>
              <div className={style.subTitle}><strong>{StageTexts[stage]}</strong></div>
              {clock}
              {stage != Stage.Pending && <div className={style.subTitle}>
                Progress: {
                 stage == Stage.OGMint || stage == Stage.WLMint ?
                   `${curSupply}/${maxFreeMint}` : `${curSupply}/${maxSupply}`
                }
              </div>}
            </>
        }
      </div>
      <div className={style.mintButton + " " + (!isMintEnable && style.disabled)}
           onClick={doMint}>
        {stage == Stage.OGMint ? "OG " : stage == Stage.WLMint ? "WL " : ""}
        {isLoading ? "Minting" : "Mint"} ({balance}/{maxMint})
      </div>
    </div>
  )
}
export default MintDisplay;

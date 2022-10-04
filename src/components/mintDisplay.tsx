import React, { useEffect, useState } from "react";
import { container, mainCard, mainTitle, subTitle, mintButton, disabled, times, value, time, label } from "./mintDisplay.module.css"
import { DateUtils } from "../utils/DateUtils";
import {ConnectState} from "../pages";
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

  const isMinted = balance == maxMint;
  const isWLMint = stage == Stage.OGMint || stage == Stage.WLMint;
  const isSaleOut =
    isWLMint ? curSupply >= maxFreeMint :
      stage == Stage.PublicSale ? curSupply >= maxSupply : false;
  const isMintEnable = !isSaleOut &&
    (stage == Stage.OGMint ? isOG :
      stage == Stage.WLMint ? isWL :
        stage == Stage.PublicSale);

  async function init() {
    const contract = await getContract();

    const data: Record<string, string> = {
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
    }
    console.log("data", data);
    // Object.keys(data).forEach(
    //   key => eval(`set${key}(Number(${data[key]}))`))
  }
  useEffect(() => {init().then()}, []);

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

  const [days, hours, minutes, seconds] = DateUtils.diff2Time(restTime);
  const timeItem: any = { days, hours, minutes, seconds };

  const clock = <div className={times}>
    {Object.keys(timeItem).map(key => {
      let str: string = timeItem[key].toString();
      if (key != "days") str = str.padStart(2, "0");
      return <div className={time}>
        <div className={value}>{str}</div>
        <div className={label}>{key}</div>
      </div>;
    })}
  </div>

  return (
    <div className={container + " " + className}>
      <div className={mainCard}>
        {stage == Stage.Publish ?
          <div className={mainTitle}>Sale Out</div> :
          stage == Stage.PublicSale ?
            <>
              <div className={subTitle}><strong>{StageTexts[stage]}</strong></div>
              <div className={mainTitle}>{curSupply}/{maxSupply}</div>
            </> :
            <>
              <div className={subTitle}><strong>{StageTexts[stage]}</strong></div>
              {clock}
              {stage != Stage.Pending && <div className={subTitle}>
                Progress: {
                 stage == Stage.OGMint || stage == Stage.WLMint ?
                   `${curSupply}/${maxFreeMint}` : `${curSupply}/${maxSupply}`
                }
              </div>}
            </>
        }
      </div>
      <div className={mintButton + " " + (!isMintEnable && disabled)}>
        {stage == Stage.OGMint ? "OG " : stage == Stage.WLMint ? "WL " : ""}
        Mint ({balance}/{maxMint})
      </div>
    </div>
  )
}
export default MintDisplay;

import React, { useEffect, useState } from "react";
import { container, mainCard, mainTitle, subTitle, mintButton, times, value, time, label } from "./mintDisplay.module.css"
import { DateUtils } from "../utils/DateUtils";

export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;

export const StartTime = new Date(2022, 9, 8, 14).getTime();

export enum Stage {
  Pending, OGMint, WLMint, PublicSale, Publish
}

export const StageTexts = ["Pending", "OG Mint", "WL Mint", "Public Sale", "Sale Out"];

const MintDisplay = ({ style }: any) => {

  const [restTime, setRestTime] = useState(StartTime - Date.now());

  const [stage, setStage] = useState<Stage>(Stage.OGMint);
  const [price, setPrice] = useState(0.00777);
  const [maxFreeMint, setMaxFreeMint] = useState(1600);
  const [maxSupply, setMaxSupply] = useState(3333);
  const [curSupply, setCurSupply] = useState(0);
  const [maxMint, setMaxMint] = useState(1);
  const [balance, setBalance] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now() / 1000);

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
    <div className={container + " " + style}>
      <div className={mainCard}>
        {stage == Stage.Publish ?
          <div className={mainTitle}>Sale Out</div> :
          stage == Stage.PublicSale ?
            <>
              <div className={subTitle}>{StageTexts[stage]}</div>
              <div className={mainTitle}>{balance}/{maxMint}</div>
            </> :
            <>
              <div className={subTitle}><strong>{StageTexts[stage]}</strong></div>
              {clock}
              <div className={subTitle}>
                Progress: {
                 stage == Stage.OGMint || stage == Stage.WLMint ?
                   `${curSupply}/${maxFreeMint}` : `${curSupply}/${maxSupply}`
                }
              </div>
            </>
        }
      </div>
      <div className={mintButton}>Mint ({balance}/{maxMint})</div>
    </div>
  )
}
export default MintDisplay;

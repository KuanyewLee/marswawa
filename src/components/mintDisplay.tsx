import React, { useEffect, useState } from "react";
import { container, countDown, times, value, time, label } from "./mintDisplay.module.css"
import { DateUtils } from "../utils/DateUtils";

const WLTime = new Date(2022, 11, 26, 21).getTime();

const MintDisplay = ({ style }: any) => {

    const [restTime, setRestTime] = useState(WLTime - Date.now());

    useEffect(() => {
        const id = setInterval(() => {
            setRestTime(WLTime - Date.now())
        }, 1000);
        return () => clearInterval(id);
    }, [restTime]);

    const isOutOfDate = restTime <= 0;
    const [days, hours, minutes, seconds] = DateUtils.diff2Time(restTime);
    const timeItem: any = { days, hours, minutes, seconds };

    const countdown = <div className={times}>
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
            <div>显示当前阶段</div>
            <div className={countDown}>
                {countdown}
            </div>
            <div>显示mint个数</div>
            <div>点击调用合约mint</div>
        </div>
    )
}
export default MintDisplay;
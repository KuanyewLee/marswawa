export class DateUtils {
    static Second = 1000;
    static Minute = 60 * DateUtils.Second;
    static Hour = 60 * DateUtils.Minute;
    static Day = 24 * DateUtils.Hour;
    /**
     * 日期转化为字符串
     */
    static time2DateStr(time) {
        if (!time)
            return "";
        const date = new Date(time);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
    }
    /**
     * 日期转化为字符串
     */
    static time2TimeStr(time) {
        if (!time)
            return "";
        const date = new Date(time);
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const second = date.getSeconds().toString().padStart(2, "0");
        return `${hour}:${minute}:${second}`;
    }
    /**
     * 日期转化为字符串
     */
    static time2Str(time) {
        if (!time)
            return "";
        const date = new Date(time);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const second = date.getSeconds().toString().padStart(2, "0");
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
    /**
     * YYYY/MM/DD HH:MM:SS 字符串转换成日期
     */
    static str2Date(timeStr) {
        let [date, time] = timeStr.split(" ");
        let [year, month, day] = date.split("/");
        let [hour, minute, second] = time.split(":");
        return new Date(Number(year), Number(month), Number(day), Number(hour), Number(minute), Number(second));
    }
    /**
     * YYYY/MM/DD HH:MM:SS字符串转换成时间戳
     */
    static str2Timestamp(timeStr) {
        return DateUtils.str2Date(timeStr).valueOf();
    }
    /**
     * 时间转化为字符串
     */
    static sec2Str(sec) {
        if (sec == null)
            return "";
        sec = Math.round(sec);
        const minStr = Math.floor(sec / 60).toString().padStart(2, "0");
        const secStr = (sec % 60).toString().padStart(2, "0");
        return `${minStr}:${secStr}`;
    }
    /**
     * 将时间转换为日期
     * @param date
     */
    static date2DayStart(date) {
        let res = new Date(date);
        res.setHours(0, 0, 0, 0);
        return res;
    }
    /**
     * 判断指定日期是否为今天
     * @param date
     */
    static isToday(date) {
        return this.dayDiff(new Date(), date) == 0;
    }
    /**
     * 获取date1到date2之间相隔的天数
     */
    static dayDiff(date1, date2) {
        if (typeof date1 == 'number' && date1 <= 0)
            return Number.NEGATIVE_INFINITY;
        if (typeof date2 == 'number' && date2 <= 0)
            return Number.POSITIVE_INFINITY;
        const day1 = this.date2DayStart(date1).getTime();
        const day2 = this.date2DayStart(date2).getTime();
        return (day1 - day2) / this.Day;
    }
    /**
     * 时间差值转化为具体时间
     */
    static diff2Time(diff) {
        const days = Math.floor(diff / this.Day);
        const hours = Math.floor(diff % this.Day / this.Hour);
        const minute = Math.floor(diff % this.Hour / this.Minute);
        const seconds = Math.floor(diff % this.Minute / this.Second);
        return [days, hours, minute, seconds];
    }
}

export class StringUtils {
    static displayAddress(address) {
        const len = address?.length;
        return address && `${address.slice(0, 6)}...${address.slice(len - 4, len)}`;
    }
    static line2Hump(str) {
        return str.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase());
    }
    static hump2Line(str) {
        return str.replace(/([A-Z])/g, "-$1")
            .toLowerCase().substring(1);
    }
    static fillData2Str(str, data) {
        const re = /:(.+?)(\/|$)/g;
        let res = str, match;
        while ((match = re.exec(str)) !== null) {
            res = res.replace(match[0], data[match[1]] + match[2]);
            delete data[match[1]];
        }
        return res;
    }
}

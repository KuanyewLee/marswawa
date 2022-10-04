
export class StringUtils {

	public static displayAddress(address: string) {
		const len = address?.length;
		return address && `${address.slice(0,6)}...${address.slice(len - 4, len)}`
	}

	public static line2Hump(str: string) {
		return str.replace(/\-(\w)/g,
			(all, letter) => letter.toUpperCase());
	}
	public static hump2Line(str: string) {
		return str.replace(/([A-Z])/g,"-$1")
			.toLowerCase().substring(1);
	}

	public static fillData2Str(str: string, data: any) {
		const re = /:(.+?)(\/|$)/g;
		let res = str, match;

		while ((match = re.exec(str)) !== null) {
			res = res.replace(match[0], data[match[1]] + match[2])
			delete data[match[1]];
		}
		return res;
	}
}

export const getUpdateDocument = (body: any, keys: string[]) => {
	const update: any = {};
	for (let key of keys) {
		if (!!body[key]) {
			update[key] = body[key];
		}
	}
	return update;
};

export const serialize = (payload: any) => JSON.parse(JSON.stringify(payload));

export const arrayToMap = (payload: any[], key: string) => {
	const map: any = {};
	for (let val of payload) {
		const keyName = val[key];
		map[keyName] = val
	}
	return map;
};

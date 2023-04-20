export const getUpdateDocument = (body: any, keys: string[]) => {
	const update: any = {};
	for (let key of keys) {
		if (!!body[key]) {
			update[key] = body[key];
		}
	}
	return update;
};

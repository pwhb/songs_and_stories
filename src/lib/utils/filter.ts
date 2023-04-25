import { filteredResults } from './stores';

export const filterResults = (search: string, docs: any[], keys: string[]) => {
	if (docs[0] && search) {
		const res = docs.filter((doc) => {
			for (let key of keys) {
				const reg = new RegExp(search, 'ig');
				const value = doc[key] as string;
				if (value && value.match(reg)) {
					return true;
				}
			}
			false;
		});
		return res as any;
	}
	return docs;
};

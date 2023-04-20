export const slugify = (str: string) => {
	const split = str.toLowerCase().split(' ');
	return split.join('-');
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const startCase = (str: string) => {
	const split = str.toLowerCase().split(' ');
	return split.map((str) => capitalize(str)).join(' ');
};

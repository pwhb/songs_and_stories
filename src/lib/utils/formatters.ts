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

export const getBreadcrumbs = (pathname: string) => {
	const split = pathname.split('/').slice(1);
	const breadcrumbs = split.map((val, idx) => {
		return {
			label: idx === 0 ? 'edit' : val,
			href: '/' + split.slice(0, idx + 1).join('/')
		};
	});
	return breadcrumbs;
};

export const getPath = (pathname: string) => pathname.split('/').slice(-1)[0];

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

export const parseAvatarPlaceholder = (user: any) => {
	if (user.firstName && user.lastName) {
		return user.firstName[0] + user.lastName[0];
	}

	return user.username[0];
};

export const checkIsAllowed = (role: any, path: string) => {
	if (!path) {
		return true;
	}
	const access = Object.keys(role.details);
	if (!access.includes(path) && !access.includes('all')) {
		return false;
	}
	return true;
};

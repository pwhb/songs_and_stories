import { PUBLIC_BASE_URL } from '$env/static/public';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const nthNumber = (n: number) =>
{
	if (n > 3 && n < 21) return 'th';
	switch (n % 10)
	{
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};

export const getBirthdayPersons = (birthdays: any[]) =>
{
	const filtered = birthdays.filter(b =>
	{
		const now = dayjs().tz(b.timezone);
		const birth = dayjs(b.date).tz(b.timezone);
		b.years = now.diff(birth, 'year');
		b.text = b.text || `Happy ${b.years}${nthNumber(b.years)} Birthday, ${b.name}!`;
		return now.date() === birth.date() && now.month() === birth.month();
	});

	return filtered;
};

export const getOneBirthdayPerson = (birthdayPersons: any[]) =>
{
	const importantOnes = birthdayPersons.filter(b => b.important);
	const length = importantOnes.length ? importantOnes.length : birthdayPersons.length;
	const randIdx = Math.floor(Math.random() * length);
	return importantOnes.length ? importantOnes[randIdx] : birthdayPersons[randIdx];
};
export const slugify = (str: string) =>
{
	const split = str.toLowerCase().replace('?', '').split(' ');
	return split.join('-');
};

export const capitalize = (str: string) =>
{
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const startCase = (str: string) =>
{
	const split = str.toLowerCase().split(' ');
	return split.map((str) => capitalize(str)).join(' ');
};

export const getBreadcrumbs = (pathname: string) =>
{
	const split = pathname.split('/').slice(1);
	const breadcrumbs = split.map((val, idx) =>
	{
		return {
			label: idx === 0 ? 'edit' : val,
			href: '/' + split.slice(0, idx + 1).join('/')
		};
	});
	return breadcrumbs;
};

export const getPath = (pathname: string) => pathname.split('/')[2];

export const parseAvatarPlaceholder = (user: any) =>
{
	if (user.firstName && user.lastName)
	{
		return user.firstName[0] + user.lastName[0];
	}

	return user.username[0];
};

export const checkIsAllowed = (role: any, path: string) =>
{
	if (!path)
	{
		return true;
	}
	const access = Object.keys(role.details);
	if (!access.includes(path) && !access.includes('all'))
	{
		return false;
	}
	return true;
};

export const parseAccessDetails = (details: any) =>
{
	if (!details)
	{
		return '';
	}
	const arr = [];
	for (let access of Object.keys(details))
	{
		arr.push(`${access} (${details[access]})`);
	}
	return arr.join(', ');
};

export const parseDate = (date: string) => dayjs(date).format('MMM D, YYYY h:mm A');

export const parsePublicDate = (date: string) => dayjs(date).format('MMMM YYYY');

export const parseFinishedDate = (date: string) => dayjs(date).format('MMMM DD, YYYY');

export const getPreview = (body: string) => body.slice(0, 255) + ' ...';

export const getUrl = (id: string) => `${PUBLIC_BASE_URL}/api/uploads/${id}`;
export const getContentType = (fileName: string) =>
{
	return fileName.split('/')[0];
};

export const getFileSize = (size: number) =>
{
	if (size < 1024)
	{
		return `${size} B`;
	}
	if (size < 1024 * 1024)
	{
		return `${(size / 1024).toFixed(2)} KB`;
	}
	if (size < 1024 * 1024 * 1024)
	{
		return `${(size / 1024 / 1024).toFixed(2)} MB`;
	}
	return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
};
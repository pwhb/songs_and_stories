import { redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const logout: Action = async ({ request, url, cookies }) => {
	console.log('logout called');

	cookies.delete('token');

	// cookies.set("token", "", {
	//     path: '/',
	//     expires: new Date(0)
	// })
	console.log('logout referer', request.referrer);

	throw redirect(302, '/auth/login');
};

export const actions: Actions = {
	default: logout
};

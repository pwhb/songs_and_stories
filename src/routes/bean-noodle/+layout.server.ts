import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { serialize } from '$lib/utils/validate';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/auth/login');
	}

	return {};
};

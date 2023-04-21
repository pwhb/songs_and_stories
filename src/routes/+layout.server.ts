import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import clientPromise from '$lib/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const config = await db.collection('configs').findOne({ name: 'main' });

	return {
		config: JSON.parse(JSON.stringify(config)),
		user: locals.user ? JSON.parse(JSON.stringify(locals.user)) : null
	};
};

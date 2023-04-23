import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import clientPromise from '$lib/utils/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { serialize } from '$lib/utils/validate';

export const load: LayoutServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const config = await db.collection('configs').findOne({ name: 'main' });
	const privateConfig = await db.collection('configs').findOne({ name: 'private' });

	return {
		config: serialize(config),
		privateConfig: serialize(privateConfig),
		user: locals.user ? serialize(locals.user) : null
	};
};

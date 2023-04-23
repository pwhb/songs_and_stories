import type { PageServerLoad } from './$types';
import clientPromise from '$lib/utils/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { serialize } from '$lib/utils/validate';

export const load: PageServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const fullUser = await db.collection('users').findOne({ _id: locals.user._id });

	return {
		fullUser: serialize(fullUser)
	};
};

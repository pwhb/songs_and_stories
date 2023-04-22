import type { PageServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { serialize } from '$lib/utils/validate';

export const load: PageServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const docs = await db.collection('roles').find().toArray();

	return {
		docs: serialize(docs)
	};
};

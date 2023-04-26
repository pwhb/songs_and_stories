import type { PageServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const doc = await db.collection('writings').findOne({ _id: new ObjectId(id) });

	return {
		doc: serialize(doc)
	};
};

import type { PageServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';
import DBKeys from '$lib/constants/DBKeys';

export const load: PageServerLoad = async ({ locals }) =>
{
	const client = await clientPromise;
	const col = client.db(MONGODB_DATABASE).collection(DBKeys.UploadCollection);
	const docs = await col.find().toArray();

	return {
		docs: serialize(docs)
	};
};

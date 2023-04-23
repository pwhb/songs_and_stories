import type { LayoutServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';


export const load: LayoutServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const docs = await db.collection('roles').find().toArray();
	
	return {
		roles: docs.map((v) => v.name)
	};
};

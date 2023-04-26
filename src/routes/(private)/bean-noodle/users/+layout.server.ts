import type { LayoutServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';

export const load: LayoutServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const roles = await db.collection('roles').find().toArray();

	return {
		roles: roles.map((v) => v.name)
	};
};

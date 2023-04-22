import type { LayoutServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';

export const load: LayoutServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);

	return {};
};

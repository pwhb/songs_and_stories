import type { PageServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { arrayToMap, serialize } from '$lib/utils/validate';

export const load: PageServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const configs = await db.collection('configs').find().toArray();
	const map = arrayToMap(configs, 'name');
	// console.log('map', map);

	return {
		docs: serialize(configs),
		map: serialize(map)
	};
};

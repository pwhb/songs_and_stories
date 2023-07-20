import type { LayoutServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';

export const load: LayoutServerLoad = async ({ locals }) =>
{
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const categories = await db
		.collection('categories')
		.aggregate([
			{
				$project: {
					label: 1,
					value: 1,
					_id: 0
				}
			}
		])
		.toArray();
	const songs = await db
		.collection('songs')
		.aggregate([
			{
				$addFields: {
					label: { $concat: ['$title', ' - ', '$artist'] },
					value: '$_id'
				}
			},
			{
				$project: {
					label: 1,
					value: 1,
					_id: 0
				}
			}
		])
		.toArray();
	return {
		categories: categories,
		songs: serialize(songs)
	};
};

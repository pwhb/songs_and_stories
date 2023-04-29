import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const writings = await db
		.collection('writings')
		.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author'
				}
			},
			{
				$addFields: {
					author: {
						$arrayElemAt: ['$author', 0]
					}
				}
			},
			{
				$project: {
					'author.password': 0,
					'author.createdBy': 0,
					'author.createdAt': 0,
					'author.updatedAt': 0,
					'author._id': 0
				}
			},
			{ $sort: { finishedAt: -1 } }
		])
		.toArray();

	return {
		writings: serialize(writings)
	};
};

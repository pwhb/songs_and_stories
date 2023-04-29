import type { PageServerLoad } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const doc = await db
		.collection('writings')
		.aggregate([
			{
				$match: {
					_id: new ObjectId(id)
				}
			},
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
					'author.updatedAt': 0
				}
			},
			{ $limit: 1 }
		])
		.toArray();

	console.log('doc', doc);

	return {
		doc: serialize(doc[0])
	};
};

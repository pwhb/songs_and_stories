import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';
import { ObjectId } from 'mongodb';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const docs = await db
		.collection('writings')
		.aggregate([
			{
				$match: {
					slug: id
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
				$lookup: {
					from: 'songs',
					localField: 'song',
					foreignField: '_id',
					as: 'song'
				}
			},
			{
				$addFields: {
					song: {
						$arrayElemAt: ['$song', 0]
					}
				}
			},
			{
				$project: {
					'author.password': 0,
					'author.createdBy': 0,
					'author.createdAt': 0,
					'author.updatedAt': 0,
					'song.createdBy': 0,
					'song.createdAt': 0,
					'song.updatedAt': 0,
					'song._id': 0
				}
			},
			{ $sort: { finishedAt: -1 } }
		])
		.toArray();

	return {
		doc: serialize(docs[0])
	};
};

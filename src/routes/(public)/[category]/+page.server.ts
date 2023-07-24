import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) =>
{
	const { category } = params;
	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const match: any = {
		active: true,
	};


	if (category === "stories")
	{
		match["category"] = "fiction";
	} else if (category === "not-stories")
	{
		match["category"] = "non-fiction";
	}
	const docs = await db
		.collection('writings')
		.aggregate([
			{
				$match: match
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
		docs: serialize(docs)
	};
};

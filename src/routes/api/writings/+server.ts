import clientPromise from '$lib/utils/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const COLLECTION = 'writings';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
	if (!locals.user) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const active = url.searchParams.get('active');
		const filter: { active?: boolean } = {};

		if (!!active) {
			filter.active = active == 'true';
		}
		const docs = await col.find(filter).toArray();
		return json({ success: true, data: docs, total: docs.length }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	if (!locals.user) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const body = await request.json();
		const res = await col.insertOne(
			{
				...body,
				author: body.author ? new ObjectId(body.author) : locals.user._id,
				song: body.song ? new ObjectId(body.song) : '',
				createdAt: new Date(),
				updatedAt: new Date(),
				finishedAt: body.finishedAt ? new Date(body.finishedAt) : new Date(),
				active: !!body.active ? body.active : true
			},
			{}
		);

		return json({ success: true, data: res }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

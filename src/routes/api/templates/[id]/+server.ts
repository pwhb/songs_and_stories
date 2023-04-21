import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { startCase } from '$lib/utils/formatters';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const COLLECTION = 'songs';

export const GET: RequestHandler = async ({ locals, cookies, params }: RequestEvent) => {
	if (!locals.user) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const { id } = params;
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);
		const doc = await col.findOne({ _id: new ObjectId(id) });
		return json({ success: true, data: doc }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ locals, request, cookies, params }: RequestEvent) => {
	if (!locals.user) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const { id } = params;
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const body = await request.json();
		const update = {
			...body,
			updatedAt: new Date()
		};

		if (!!body.title) {
			update.title = startCase(body.title);
		}
		if (!!body.artist) {
			update.artist = startCase(body.artist);
		}

		const res = await col.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$set: update
			},
			{ returnDocument: 'after' }
		);

		return json({ success: true, data: res.value }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ locals, cookies, params }: RequestEvent) => {
	if (!locals.user) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const { id } = params;
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const res = await col.deleteOne({ _id: new ObjectId(id) });

		return json({ success: true, data: res }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

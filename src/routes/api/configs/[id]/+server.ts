import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { startCase } from '$lib/utils/formatters';
import { logHistory } from '$lib/utils/history';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const COLLECTION = 'configs';

export const GET: RequestHandler = async ({ locals, cookies, params }: RequestEvent) => {
	try {
		const { id } = params;
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);
		const doc = await col.findOne({ name: id });
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

		if (body._id) {
			body._id = new ObjectId(body._id);
		}

		const res = await col.replaceOne(
			{ name: id },
			{
				...body,
				name: id
			}
		);

		await logHistory({
			doc: body,
			collection: COLLECTION,
			operation: 'update',
			updatedBy: locals.user._id
		});

		return json({ success: true, data: res }, { status: 201 });
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

		const res = await col.deleteOne({ name: id });

		return json({ success: true, data: res }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

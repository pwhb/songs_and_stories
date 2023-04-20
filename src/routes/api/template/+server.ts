import clientPromise from '$lib/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

const COLLECTION = 'songs';

export const GET: RequestHandler = async ({}: RequestEvent) => {
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);
		const docs = await col.find().toArray();
		return json({ success: true, data: docs, total: docs.length }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const body = await request.json();
		const res = await col.insertOne(body, {});
		console.log(res);

		return json({ success: true, data: res }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

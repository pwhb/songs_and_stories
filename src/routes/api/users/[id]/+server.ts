import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const COLLECTION = 'users';

export const GET: RequestHandler = async ({ locals, cookies, params }: RequestEvent) => {
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

// export const DELETE: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	
// 	try {
// 		const { id } = params;
// 		const client = await clientPromise;
// 		const db = client.db(MONGODB_DATABASE);
// 		const col = db.collection(COLLECTION);

// 		const res = await col.deleteOne({ _id: new ObjectId(id) });

// 		return json({ success: true, data: res }, { status: 200 });
// 	} catch (err) {
// 		console.error(err);
// 		return json({ success: false, error: err }, { status: 400 });
// 	}
// };

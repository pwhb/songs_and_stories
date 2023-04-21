import clientPromise from '$lib/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

const COLLECTION = 'histories';

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

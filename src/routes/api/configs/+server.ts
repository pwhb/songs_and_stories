import clientPromise from '$lib/mongodb';
import { MONGODB_DATABASE } from '$env/static/private';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { startCase } from '$lib/utils/formatters';
import { logHistory } from '$lib/utils/history';

const COLLECTION = 'configs';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
	if (!locals.user || locals.user.role.name !== 'admin') {
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
		const pipeline = [
			{
				$match: filter
			}
		];
		const docs = await col.aggregate(pipeline).toArray();
		return json({ success: true, data: docs, total: docs.length }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	if (!locals.user || locals.user.role.name !== 'admin') {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const body = await request.json();

		const existingDocument = await col.findOne({
			name: body.name
		});

		if (existingDocument) {
			return json(
				{ success: false, error: { message: 'config name already taken' } },
				{ status: 400 }
			);
		}

		const res = await col.insertOne({
			...body,
			appName: startCase(body.appName)
		});

		await logHistory({
			doc: { _id: res.insertedId, ...body },
			collection: COLLECTION,
			operation: 'insert',
			updatedBy: locals.user._id
		});

		return json({ success: true, data: res }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

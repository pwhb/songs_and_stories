import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { slugify } from '$lib/utils/formatters';
import { logHistory } from '$lib/utils/history';
import { getUpdateDocument } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { hash } from 'argon2';

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

export const PATCH: RequestHandler = async ({ locals, request, cookies, params }: RequestEvent) => {
	if (
		!locals.user ||
		(locals.user.role.name !== 'admin' && locals.user._id.toString() !== params.id)
	) {
		return json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
	}
	try {
		const { id } = params;
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);

		const body = await request.json();

		const existingDocument = await col.findOne({
			$and: [
				{
					_id: {
						$ne: new ObjectId(params.id)
					}
				},
				{
					$or: [
						{
							username: body.username
						},
						{
							penName: body.penName
						}
					]
				}
			]
		});

		if (existingDocument) {
			return json(
				{ success: false, error: { message: 'username already taken' } },
				{ status: 400 }
			);
		}

		const keys = ['username', 'penName', 'avatar', 'firstName', 'lastName'];
		if (locals.user.role.name === 'admin') {
			keys.push('role');
		}
		const update = getUpdateDocument(body, keys);
		if (body.password) {
			update.password = await hash(body.password);
		}
		const res = await col.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$set: {
					...update,
					slug: slugify(update.firstName + ' ' + update.lastName),
					updatedAt: new Date()
				}
			},
			{ returnDocument: 'after' }
		);

		if (!res) {
			return json({ success: false, error: { message: 'not found' } }, { status: 404 });
		}
		await logHistory({
			doc: res.value,
			collection: COLLECTION,
			operation: 'update',
			updatedBy: locals.user._id
		});
		return json({ success: true, data: res.value }, { status: 201 });
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

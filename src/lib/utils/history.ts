import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import type { ObjectId } from 'mongodb';

const COLLECTION = 'histories';

export const logHistory = async ({
	doc,
	collection,
	operation,
	updatedBy
}: {
	doc: any;
	collection: string;
	operation: string;
	updatedBy: ObjectId;
}) => {
	const log = {
		collection,
		updatedBy,
		operation,
		timestamp: new Date(),
		doc
	};

	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection(COLLECTION);
		await col.insertOne(log);
	} catch (err) {
		console.error(err);
	}
};

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { list, upload } from '$lib/utils/s3';
import { getQuery } from '$lib/utils/helpers';
import DBKeys from '$lib/constants/DBKeys';



export const GET: RequestHandler = async ({ url }) =>
{
	try
	{
		const filter: any = getQuery(url.searchParams);
		const aws = await list();
		const client = await clientPromise;
		const col = client.db(MONGODB_DATABASE).collection(DBKeys.UploadCollection);
		const docs = await col.find(filter).toArray();
		return json({ success: true, data: docs, aws: aws?.Contents, dataLength: docs.length, awsLength: aws?.Contents?.length }, { status: 200 });
	} catch (err)
	{
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) =>
{
	try
	{
		const form = await request.formData();
		const file: Blob = form.get('file') as any;
		const data = await file.arrayBuffer();

		const Key = `${new Date().valueOf()}_${file.name}`;

		const params = {
			Key: Key,
			Body: Buffer.from(data),
			ContentType: file.type
		};
		const res = await upload(params);
		if (!res)
		{
			throw new Error('upload failed');
		}

		const client = await clientPromise;
		const col = client.db(MONGODB_DATABASE).collection(DBKeys.UploadCollection);
		const dbRes = await col.insertOne({
			Key: Key,
			ContentType: file.type,
			active: true,
			Size: file.size,
			createdAt: new Date(),
			updatedAt: new Date()
		});

		return json({
			success: true, data: {
				...dbRes,
				ContentType: file.type,
				Size: file.size,
			}
		}, { status: 201 });
	} catch (err)
	{
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

// export const GET: RequestHandler = async ({ }) =>
// {
// 	try
// 	{
// 		const params = {
// 			Bucket: BUCKET_NAME
// 		};
// 		const res = await s3.listObjects(params).promise();

// 		return json({ success: true, data: res }, { status: 201 });
// 	} catch (err)
// 	{
// 		console.error(err);
// 		return json({ success: false, error: err }, { status: 400 });
// 	}
// };

// export const POST: RequestHandler = async ({ request, url }) =>
// {
// 	try
// 	{
// 		const form = await request.formData();

// 		const file: Blob = form.get('file') as any;

// 		const data = await file.arrayBuffer();

// 		const params = {
// 			Bucket: BUCKET_NAME,
// 			Key: file.name,
// 			Body: Buffer.from(data),
// 			ContentType: file.type
// 		};
// 		const res = await s3.upload(params).promise();

// 		return json({ success: true, data: res }, { status: 201 });
// 	} catch (err)
// 	{
// 		console.error(err);
// 		return json({ success: false, error: err }, { status: 400 });
// 	}
// };

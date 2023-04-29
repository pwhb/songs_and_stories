import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import s3 from '$lib/utils/s3';
import { BUCKET_NAME } from '$env/static/private';

export const GET: RequestHandler = async ({}) => {
	try {
		const params = {
			Bucket: BUCKET_NAME
		};
		const res = await s3.listObjects(params).promise();
		console.log(res);

		return json({ success: true, data: res }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const form = await request.formData();

		console.log('form', form);
		const file: Blob = form.get('file') as any;

		const data = await file.arrayBuffer();

		console.log('file', file, file.name, file.type, data);

		const params = {
			Bucket: BUCKET_NAME,
			Key: file.name,
			Body: Buffer.from(data),
			ContentType: file.type
		};
		const res = await s3.upload(params).promise();
		console.log(res);

		return json({ success: true, data: res }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

import type { PageServerLoad } from './$types';
import { BUCKET_BASE_URL, MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { serialize } from '$lib/utils/validate';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const res = await fetch('/api/uploads');
	const { data } = await res.json();

	return {
		docs: data.Contents,
		bucketBaseUrl: BUCKET_BASE_URL
	};
};

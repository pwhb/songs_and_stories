import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { verifyToken } from '$lib/utils/jwt';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authMiddleware: Handle = async ({ event, resolve }) => {
	const authHeader = event.request.headers.get('Authorization');

	if (!authHeader) {
		return await resolve(event);
	}

	const [BeanNoodle, token] = authHeader.split(' ');
	if (BeanNoodle !== 'BeanNoodle') {
		return await resolve(event);
	}

	const decoded = verifyToken(token) as any;
	if (!decoded) {
		return await resolve(event);
	}

	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection('users');

		const user = (await col.findOne(
			{ username: decoded.user.username },
			{ projection: { username: 1, role: 1, avatar: 1, penName: 1 } }
		)) as any;

		event.locals.user = user;
	} catch (err) {
		console.error(err);
	}

	return await resolve(event);
};

export const handle = sequence(authMiddleware);

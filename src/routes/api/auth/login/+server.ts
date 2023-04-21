import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { startCase } from '$lib/utils/formatters';
import { generateToken } from '$lib/utils/jwt';
import { type RequestHandler, type RequestEvent, json, redirect } from '@sveltejs/kit';
import { verify } from 'argon2';

export const POST: RequestHandler = async ({ request, cookies }: RequestEvent) => {
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_DATABASE);
		const col = db.collection('users');

		const { username, password } = await request.json();

		const user = (await col.findOne({ username })) as any;
		if (!user) {
			return json({ success: false, error: { message: 'user not found' } }, { status: 404 });
		}

		const isCorrect = await verify(user.password, password);
		if (!isCorrect) {
			return json({ success: false, error: { message: 'invalid credentials' } }, { status: 400 });
		}
		const token = generateToken({
			username: user.username,
			role: user.role
		});

		const referer = request.headers.get('Referer');
		// console.log(referer);
		if (referer === `${'http://localhost:5173/auth/login'}`) {
			cookies.set('token', token);
			console.log('cookies set', token);
			return json(
				{
					success: true,
					data: {
						username: user.username,
						role: user.role,
						token
					}
				},
				{ status: 201, headers: {
					
				} }
			);
		}
		return json(
			{
				success: true,
				data: {
					username: user.username,
					role: user.role,
					token
				}
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

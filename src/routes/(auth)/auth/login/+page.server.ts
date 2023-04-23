import { fail, json, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { verify } from 'argon2';
import { MONGODB_DATABASE } from '$env/static/private';
import clientPromise from '$lib/utils/mongodb';
import { generateToken } from '$lib/utils/jwt';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/bean-noodle');
	}
};

const login: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const { username, password } = Object.fromEntries(data);

	const invalid = { username: '', password: '' };
	const previous = { username };
	if (!username) {
		invalid.username = 'username cannot be empty';
	}
	if (!password) {
		invalid.password = 'password cannot be empty';
	}

	if (invalid.username || invalid.password) {
		return fail(400, { invalid, previous });
	}

	const client = await clientPromise;
	const db = client.db(MONGODB_DATABASE);
	const col = db.collection('users');

	const user = (await col.findOne({ username })) as any;
	if (!user) {
		invalid.username = "user doesn't exist";
		return fail(400, { invalid, previous });
	}

	const isCorrect = await verify(user.password, password as string);
	if (!isCorrect) {
		invalid.password = 'wrong password';
		return fail(400, { invalid, previous });
	}
	const token = generateToken({
		username: user.username,
		role: user.role
	});

	cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 // 1 day
	});

	throw redirect(303, '/bean-noodle');
};

export const actions: Actions = {
	default: login
};

import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	try {
		const { id } = params;
		return json({ success: true }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	try {
		const { id } = params;
		return json({ success: true }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	try {
		const { id } = params;
		return json({ success: true }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

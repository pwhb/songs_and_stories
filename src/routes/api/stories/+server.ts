import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({}: RequestEvent) => {
	try {
		return json({ success: true, data: [], total: 0 }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const body = await request.json();
		return json({ success: true, data: {} }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};

// See https://kit.svelte.dev/docs/types#app

import type { ObjectId } from 'mongodb';

// for information about these interfaces
declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			user: {
				_id: ObjectId;
				username: string;
				role: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

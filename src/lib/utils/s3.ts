import { S3 } from 'aws-sdk';
import { APPLICATION_KEY, APPLICATION_KEY_ID, ENDPOINT } from '$env/static/private';

const options = {
	endpoint: ENDPOINT,
	accessKeyId: APPLICATION_KEY_ID,
	secretAccessKey: APPLICATION_KEY
};

declare global {
	var _s3: S3;
}

class Singleton {
	private static _instance: Singleton;

	private s3: S3;
	private constructor() {
		this.s3 = new S3(options);
		if (process.env.NODE_ENV === 'development') {
			// In development mode, use a global variable so that the value
			// is preserved across module reloads caused by HMR (Hot Module Replacement).
			global._s3 = this.s3;
		}
	}

	public static get instance() {
		if (!this._instance) {
			this._instance = new Singleton();
		}
		return this._instance.s3;
	}
}
const s3 = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default s3;

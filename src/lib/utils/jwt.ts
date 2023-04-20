import { AUTH_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

// Set the secret key and expiration time
const secretKey = AUTH_SECRET_KEY;
const expirationTime = '1h';

// Example user data
const user = {
	id: 123,
	name: 'John Doe',
	email: 'johndoe@example.com'
};

// Generate a JWT token
export const generateToken = (user: any) => {
	const token = jwt.sign({ user }, secretKey, { expiresIn: expirationTime });
	return token;
};

// Verify a JWT token
export const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, secretKey);
		return decoded;
	} catch (err) {
		return null;
	}
};

import request from '../utils/request.util';

export async function users(): Promise<object[]> {
	return request({ url: 'users' });
}

export async function login(credentials: object): Promise<{token: string}> {
	return request({
		url: 'users/login',
		method: 'POST',
		body: credentials,
	});
}

export async function verify(token: string): Promise<object> {
	return request({
		url: 'users/verify',
		method: 'POST',
		headers: { Authorization: `bearer ${token}` },
	});
}

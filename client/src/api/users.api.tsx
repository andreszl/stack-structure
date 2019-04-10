import request from '../utils/request.util'

export async function users() : Promise<any>{
	return await request({
		url: "users"
	})
}

export async function login(credentials) : Promise<any>{
	return await request({
		url: "users/login",
		method: 'POST',
		body: credentials
	})
}

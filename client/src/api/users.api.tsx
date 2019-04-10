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

export async function verify(token) : Promise<any>{
	console.log(token)
	return await request({
		url: "users/verify",
		method: 'POST',
		headers: {'Authorization': "bearer " + token},
	})
}
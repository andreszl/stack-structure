import request from '../utils/request.util'

export async function users() : Promise<any>{
	return await request({
		url: "users"
	})
}

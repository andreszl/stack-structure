import { usersConstants } from '../constants/'

export function users(users){
	const action = {
		type: usersConstants.USERS,
		users: users
	}
	console.log('action in users', action)
	return action
}
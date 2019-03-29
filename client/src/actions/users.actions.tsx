import { usersConstants } from '../constants/'
import api from '../api'

		
export function fetchUsersBegin(){
	let action = {
		type: usersConstants.USERS
	}
	// console.log('action in users', action)
	return action
}


export async function fetchUsers(): Promise<any>{
	return async dispatch => {
		dispatch((fetchUsersBegin()))
		let users = await api.usersAPi.users()
		dispatch(fetchUsersSuccess(users));
	};
}

export function fetchUsersSuccess(users){
	let action = {
		type: usersConstants.FETCH_USERS_SUCCESS,
		payload: { users }
	}
	return action
}

export function fetchUsersFailure(err){
	let action = {		
		type: usersConstants.FETCH_USERS_FAILURE,
		payload: { err }		  
	}
	return action
}

export function findUsersByName(name){
	let action = {
		type: usersConstants.FIND_USERS_BY_NAME,
		payload: { name }	
	}

	return action
}
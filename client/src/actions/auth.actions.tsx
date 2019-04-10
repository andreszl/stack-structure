import { authConstants } from '../constants/'
import api from '../api'
import jwt from 'jsonwebtoken'

export function setCurrentUser(user){
	return {
		type: authConstants.SET_CURRENT_USER,
		user
	}
}

export function login(credentials){
	return async (dispatch) => {
		let data = await api.usersAPi.login(credentials)
		localStorage.setItem('token', data.token)
		dispatch(setCurrentUser(jwt.decode(data.token)))	
	}
}


export function logout(){
	return (dispatch) => {
		localStorage.removeItem('token')
		dispatch(setCurrentUser({}))	
	}
}
import jwt from 'jsonwebtoken';
import api from '../api';
import { authConstants } from '../constants';

export function setCurrentUser(user: object): {type: string; user: object} {
	return {
		type: authConstants.SET_CURRENT_USER,
		user,
	};
}

export function removeCurrentUser() {
	return {
		type: authConstants.REMOVE_CURRENT_USER,
	};
}

export function login(credentials: {username: string; password: string}): Function {
	return async (dispatch: Function): Promise<void> => {
		const data = await api.usersAPi.login(credentials);
		localStorage.setItem('token', data.token);
		dispatch(setCurrentUser({ user: jwt.decode(data.token) }));
	};
}


export function logout(): Function {
	return (dispatch: (arg0: { type: string; }) => void): void => {
		localStorage.removeItem('token');
		dispatch(removeCurrentUser());
	};
}

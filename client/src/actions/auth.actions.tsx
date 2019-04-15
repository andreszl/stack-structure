import jwt from 'jsonwebtoken';
import api from '../api';
import { authConstants } from '../constants';

export function setCurrentUser(user): {type: string; user: string} {
	return {
		type: authConstants.SET_CURRENT_USER,
		user,
	};
}

export function login(credentials: {username: string; password: string}): void {
	async (dispatch: Function): Promise<void> => {
		const data = await api.usersAPi.login(credentials);
		localStorage.setItem('token', data.token);
		dispatch(setCurrentUser(jwt.decode(data.token)));
	};
}

export function logout(): void{
	(dispatch): void => {
		localStorage.removeItem('token');
		dispatch(setCurrentUser({}));
	};
}

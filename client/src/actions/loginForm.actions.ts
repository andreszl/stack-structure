import { validate } from '../utils/functions.util';
import { validateEmail } from '../utils/validations.util';
import { loginFormContans } from '../constants';

export function addEmail(email: string, error: string|null) {
	return {
		type: loginFormContans.ADD_EMAIL,
		email,
		error,
	};
}

export function emailChangedLogin(payload: string) {
	return (dispatch: Function) => {
		const email = payload.toLowerCase();
		let error: string|null = '';
		error = validate(email, validateEmail({}));
		dispatch(addEmail(email, error));
	};
}
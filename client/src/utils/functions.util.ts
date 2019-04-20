import isEmpty from 'lodash/isEmpty';
import { VALID_EMAIL, IS_STRING } from '../utils/regex.util';

function required(status: boolean, payload: string): any {
	if (status) {
		if (isEmpty(payload)) {
			return 'Este campo es requerido*';
		}
	}
	return null;
}

function isEmail(status: boolean, payload: any) {
	if (status) {
		if (payload.search(new RegExp(VALID_EMAIL))) {
			return 'El correo electronico es invalido*';
		}
	}
	return null;
}


function minLength(length: number, payload: string): any {
	if (payload.length < length) {
		return `Minimo ${length} caracteres*`;
	}
	return null;
}

function isString(status: boolean, payload: string): any {
	if (status) {
		if (payload.search(IS_STRING)) {
			return 'Solo se aceptan letras*';
		}
	}
	return null;
}

function confirmPassword(status: boolean, payload: any) {
	if (status) {
		const data = payload.split('~');
		if (data[0] !== data[1]) {
			return 'Las contraseñas no coinciden*';
		}
	}
	return null;
}


export const validate = (payload: any, validations: Object): any => {
	try {
		const options: string[] = Object.getOwnPropertyNames(validations);

		let error: any;
		options.map((option): void => {
			switch (option) {
				case 'required': error = required(validations[option], payload); break;
				case 'isEmail': error = isEmail(validations[option], payload); break;
				case 'minLength': error = minLength(validations[option], payload); break;
				case 'isString': error = isString(validations[option], payload); break;
				case 'confirmPassword': error = confirmPassword(validations[option], payload); break;
				default: null;
			}
			if (!isEmpty(error)) {
				throw error;
			}
		});
		return null;

	} catch (err) {
		return err;
	}

};

export const validateName = (
	options: { required: boolean, minLength: number, maxLength: number, isString: boolean } | any,
) => {
	return {
		required: options.required || true,
		minLength: options.minLength || 8,
		maxLength: options.minLength || 45,
		isString: options.isString || false,
	};
};

export const validateEmail = (options :{ required: boolean, isEmail: boolean } | any) => {
	return {
		required: options.required || true,
		isEmail: options.isEmail || true,
	};
};

export const validatePassword = (
	options: { required: boolean, minLength: number, confirmPassword: boolean, } | any,
) => {
	return {
		required: options.required || true,
		minLength: options.minLength || 8,
		confirmPassword: options.confirmPassword || false,
	};
};

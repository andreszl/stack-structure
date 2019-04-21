import { loginFormContans } from '../constants';

const initialState = {
	email: {
		payload: '',
		error: '',
	},
};

const loginForm = (state = initialState, action: any) => {
	switch (action.type) {
		case loginFormContans.ADD_EMAIL:
			return { ...state, email: { payload: action.email, error: action.error } };

		default:
			return state;
	}
};

export default loginForm;

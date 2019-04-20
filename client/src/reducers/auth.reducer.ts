import isEmpty from 'lodash/isEmpty';
import { authConstants } from '../constants';

const initialState = {
	isAutenticated: false,
	user: {},
};

const auth = (state : any = initialState, action: any) => {
	switch (action.type) {
		case authConstants.SET_CURRENT_USER:
			return {
				isAutenticated: !isEmpty(action.user),
				user: action.user,
			};

		case authConstants.REMOVE_CURRENT_USER:
			return {
				isAutenticated: false,
				user: {},
			};

		default:
			return state;
	}
};

export default auth;

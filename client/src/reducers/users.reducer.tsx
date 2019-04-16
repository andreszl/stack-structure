import { usersConstants } from '../constants';

const initialState = {
	users: [],
	loading: false,
	error: null,
	usersFiltered: [],
};

const users = (state = initialState, action: any) => {
	switch (action.type) {
		case usersConstants.USERS:
			return { ...state, loading: true, error: null };

		case usersConstants.FETCH_USERS_SUCCESS:
			return { ...state, loading: false, users: action.payload.users };

		case usersConstants.FETCH_USERS_FAILURE:
			return { ...state, loading: false, error: action.payload.error, items: [] };

		case usersConstants.FIND_USERS_BY_NAME:
			return 	{
				...state,
				loading: false,
				usersFiltered: action.payload.name === '' ? [] : state.users.filter((user: { name: { indexOf: (arg0: any) => number; }; }) => {
					user.name.indexOf(action.payload.name) > -1;
				}),
			};
		default:
			return state;
	}
};

export default users;

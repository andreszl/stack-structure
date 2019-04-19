import { usersConstants } from '../constants';
import api from '../api';

export function fetchUsersBegin(): object {
	const action = {
		type: usersConstants.USERS,
	};
	return action;
}

export function fetchUsersSuccess(users: object[]): object {
	const action = {
		type: usersConstants.FETCH_USERS_SUCCESS,
		payload: { users },
	};

	return action;
}


export function fetchUsers(): Function {
	return async (dispatch: Function): Promise<void> => {
		dispatch((fetchUsersBegin()));
		const users = await api.usersAPi.users();
		dispatch(fetchUsersSuccess(users));
	};
}

export function fetchUsersFailure(err: string): object {
	const action = {
		type: usersConstants.FETCH_USERS_FAILURE,
		payload: err,
	};

	return action;
}

export function findUsersByName(name: string): object {
	const action = {
		type: usersConstants.FIND_USERS_BY_NAME,
		payload: name,
	};

	return action;
}

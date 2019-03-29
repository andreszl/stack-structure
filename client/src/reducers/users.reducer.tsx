import { usersConstants } from '../constants'

const initialState = {
	users: [],
	loading: false,
	error: null,
	usersFiltered: []
  };

const users = (state : any = initialState, action: any) => {
	let users : any = []


	switch(action.type){
		case usersConstants.USERS:		
			users = {...state, loading: true, error: null}
			console.log('users as state in store in case USERS ', users)
			return users

		case usersConstants.FETCH_USERS_SUCCESS:
			users = {...state, loading: false, users: action.payload.users}
			console.log('users as state in store in case FETCH_USERS_SUCCESS', users)
			return users
		
		case usersConstants.FETCH_USERS_FAILURE:
			users = {...state, loading: false, error: action.payload.error, items: []}
			console.log('users as state in store in case FETCH_USERS_FAILURE', users)
			return users

		case usersConstants.FIND_USERS_BY_NAME: 
			let usersFiltered = state.users.filter((user) => {
				return user.name.indexOf(action.payload.name)>-1;
			})
			usersFiltered = action.payload.name == '' ? [] : usersFiltered
			users = {...state, loading: false, usersFiltered: usersFiltered }
			console.log('users filtered as state in store in case FIND_USERS_BY_NAME', usersFiltered)
			return users
		
		default :
			// console.log('users as state in store in case DEFAULT', users)
			return state
	}
}

export default users
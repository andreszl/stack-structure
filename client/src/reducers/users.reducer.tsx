import { usersConstants } from '../constants'


const users = (state : any =[], action: any) => {
	let users : any = null
	switch(action.type){
		case usersConstants.USERS:
			users = action.users
			console.log('users as state in store', users)
			return users
		default :
			return state
	}
}

export default users
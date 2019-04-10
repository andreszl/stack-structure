import { authConstants } from '../constants'
import isEmpty from 'lodash/isEmpty'

const initialState = {
	isAutenticated: false,
	user: {}
  };

const auth = (state : any = initialState, action: any) => {
	switch(action.type){
        case authConstants.SET_CURRENT_USER:	
            return {
                isAutenticated: !isEmpty(action.user),
                user: action.user
            }
	
		default :
			return state
	}
}

export default auth
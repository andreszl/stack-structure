import { combineReducers } from 'redux';
import users from './users.reducer';
import auth from './auth.reducer';
import loginForm from './loginForm.reducer';

export default combineReducers({
	users,
	auth,
	loginForm,
});

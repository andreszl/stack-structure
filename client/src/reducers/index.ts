import { combineReducers } from 'redux';
import users from './users.reducer';
import auth from './auth.reducer';
import loginForm from './loginForm.reducer';
import accountForm from './auth/register/account.reducer';
import generalForm from './auth/register/general.reducer';

export default combineReducers({
	users,
	auth,
	loginForm,
	accountForm,
	generalForm,
});

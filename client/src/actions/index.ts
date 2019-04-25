import * as usersActions from './users.actions';
import * as authActions from './auth.actions';
import * as loginFormActions from './loginForm.actions';
import * as accountFormActions from './auth/register/account.actions';
import * as generalFormActions from './auth/register/general.actions';

const actions = {
	usersActions,
	authActions,
	loginFormActions,
	accountFormActions,
	generalFormActions,
};

export default actions;

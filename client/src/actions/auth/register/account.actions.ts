import { accountConstants } from '../../../constants';

export function updateAccountForm(form: object): {type: string; form: object} {
	return {
		type: accountConstants.ACCOUNT_FORM,
		form,
	};
}

export function accountForm(form: object): Function {
	return (dispatch: Function): void => {
		dispatch(updateAccountForm(form));
	};
}

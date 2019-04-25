import { generalConstants } from '../../../constants';

export function updateGeneralForm(form: object): {type: string; form: object} {
	return {
		type: generalConstants.GENERAL_FORM,
		form,
	};
}

export function generalForm(form: object): Function {
	return (dispatch: Function): void => {
		dispatch(updateGeneralForm(form));
	};
}

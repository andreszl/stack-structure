import { accountConstants } from '../../../constants';

const initialState = {
	form: {
		input: {
			payload: '',
			error: '',
		},
	},
};

const accountForm = (state : any = initialState, action: any) => {
	switch (action.type) {
		case accountConstants.ACCOUNT_FORM:
			return {
				...state, form: { input: { payload: action.form.input, error: action.form.input.error } },
			};
		default:
			return state;
	}
};

export default accountForm;

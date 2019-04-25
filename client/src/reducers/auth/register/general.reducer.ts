import { generalConstants } from '../../../constants';

const initialState = {
	form: {
		input: {
			payload: '',
			error: '',
		},
	},
};

const generalForm = (state : any = initialState, action: any) => {
	switch (action.type) {
		case generalConstants.GENERAL_FORM:
			return {
				...state, form: { input: { payload: action.form.input, error: action.form.input.error } },
			};
		default:
			return state;
	}
};

export default generalForm;

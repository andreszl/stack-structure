import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions';

export interface Props {
	generalForm: Function;
	input: string;
}

export interface State {
}

class General extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
		};
	}

	generalForm(form: { input: string } | any = {}) {
		const { generalForm } = this.props;
		generalForm(form);
	}

	render() {
		const { input } = this.props;
		return (
			<div>
				<h4>General page</h4>
				<input type="text" value={input} onChange={event => this.generalForm({ input: event.target.value })} />
			</div>
		);
	}
}

const { generalForm } = actions.generalFormActions;

export default connect(null, { generalForm })(General);

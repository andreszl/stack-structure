import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions';

export interface Props {
	accountForm: Function;
	input: string;
}

export interface State {
}

class Account extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
		};
	}

	accountForm(form: { input: string } | any = {}) {
		const { accountForm } = this.props;
		accountForm(form);
	}

	render() {
		const { input } = this.props;
		return (
			<div>
				<h4>Account page</h4>
				<input type="text" value={input} onChange={event => this.accountForm({ input: event.target.value })} />
			</div>
		);
	}
}

const { accountForm } = actions.accountFormActions;

export default connect(null, { accountForm })(Account);

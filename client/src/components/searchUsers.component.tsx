import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsersFiltered from './usersFiltered.component';
import actions from '../actions';

interface Props {
	findUsersByName: Function;
}


class SearchUsers extends Component<Props, {}> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.searchUser = this.searchUser.bind(this);
	}

	searchUser(event: any, type: string): void {
		const { findUsersByName } = this.props;

		if (type === 'press') {
			if (event.key === 'Enter') {
				findUsersByName(event.target.value);
			}
		} else {
			findUsersByName(event.target.value);
		}
	}

	render(): JSX.Element {
		return (
			<div>
				<form onSubmit={(event): void => event.preventDefault()}>
					<div>
						<input
							onChange={(event): void => this.searchUser(event, 'change')}
							onKeyPress={(event): void => this.searchUser(event, 'press')}
							type="text"
						/>
					</div>
				</form>
				<UsersFiltered />
			</div>
		);
	}
}


const { findUsersByName } = actions.usersActions;

export default connect(null, { findUsersByName })(SearchUsers as any);

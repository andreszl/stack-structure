import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchUsers from './searchUsers.component';
import actions from '../actions';

interface Props {
	dispatch: Function,
	error: any,
	loading: boolean,
	users: any
}

interface State {

}

class Users extends Component<Props, State> {
	async componentDidMount() {
		const { dispatch } = this.props;
		dispatch(await actions.usersActions.fetchUsers());
	}

	render() {
		const { error, loading, users } = this.props;
		if (error) {
			return <div>{error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<ul>
					{users.map((user: { id: string; name: string; role: string; }) => {
						return (
							<li key={user.id}>
								<label>{user.name}</label> <label>{user.role}</label>
							</li>
						);
					})}
				</ul>
				<SearchUsers />
			</div>
		);
	}
}

function mapStateToProps(state: { users: { users: object; loading: boolean; error: Error; }; }) {
	return {
		users: state.users.users,
		loading: state.users.loading,
		error: state.users.error,
	};
}


export default connect(mapStateToProps, null)(Users);

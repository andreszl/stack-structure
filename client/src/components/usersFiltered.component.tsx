import React, { Component } from 'react';
import { connect } from 'react-redux';

interface Props{
	error: any,
	loading: boolean,
	usersFiltered: [
		{
			id: string,
			name: string,
			role:string,
			status: string,
			createdAt: Date,
			updatedAt: Date,
		}
	]
}

interface State {
	title: string
}
class UsersFiltered extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			title: 'title',
		};
	}

	render() {
		const { error, loading, usersFiltered } = this.props;
		const { title } = this.state;
		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h3>{title}</h3>
				<ul>
					{usersFiltered.map((user) => {
						(
							<div key={user.id}>
								<p>id: {user.id} </p>
								<p>name: {user.name} </p>
								<p>role: {user.role}</p>
								<p>status: {user.status}</p>
								<hr />
							</div>
						);
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(
	state: { users: { users: object[]; loading: boolean; error: Error; usersFiltered: object[]; }; },
) {
	return {
		users: state.users.users,
		loading: state.users.loading,
		error: state.users.error,
		usersFiltered: state.users.usersFiltered,
	};
}

export default connect(mapStateToProps, null)(UsersFiltered);

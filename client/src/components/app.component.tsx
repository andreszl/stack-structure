import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import routes from '../routes';
import actions from '../actions';
import api from '../api';

interface Props {
	logout: Function;
	auth: { isAutenticated: boolean, user: { role: string; } };
	setCurrentUser: Function;
}

interface State {
	show: boolean;
	verify: boolean;
}

class App extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			show: false,
			verify: false,
		};

		this.logout = this.logout.bind(this);
		this.verify = this.verify.bind(this);
	}
	componentWillMount() {
		this.setState({ show: true });
	}

	componentDidMount() {
		this.verify();
	}

	async verify(): Promise<void> {
		if (localStorage.token) {
			await api.usersAPi.verify(localStorage.token).then((response): void => {
				if (response) {
					const { setCurrentUser } = this.props;
					setCurrentUser(jwt.decode(localStorage.token));
				}
			});
		}
		this.setState({ verify: true });
	}

	logout(): any {
		const { logout }	= this.props;
		logout();
		return <Redirect to={{ pathname: '/home' }} />;
	}

	render(): JSX.Element {
		const { verify } = this.state;
		const { auth } = this.props;
		const { show } = this.state;

		return (
			<div>
				{
					show ? (
						<div>
							<Switch>
								{
									routes.map(
										(
											route: {path: string; exact: boolean; component: any},

										): JSX.Element => {
											return (
												<Route
													key={route.path}
													path={route.path}
													render={(props) => {
														if (verify) {
															switch (route.path) {
																case '/login':
																	return !auth.isAutenticated ? (
																		<route.component {...props} />
																	) : (
																		<Redirect
																			to={{
																				pathname: '/users',
																			}}
																		/>
																	);

																case '/users':
																	return auth.isAutenticated ? (
																		<route.component {...props} />
																	) : (
																		<Redirect
																			to={{
																				pathname: '/home',
																				title: 'title',
																			}}
																		/>
																	);

																default:
																	return <route.component {...props} />;
															}
														}
														return null;
													}}
												/>
											);
										},
									)
								}
							</Switch>
						</div>
					) : (<p>loading...</p>)
				}
			</div>
		);
	}
}

function mapStateToProps(state: {auth: object}): object {
	return {
		auth: state.auth,
	};
}

const { logout } = actions.authActions;
const { setCurrentUser } = actions.authActions;

export default connect(mapStateToProps, { logout, setCurrentUser })(App);

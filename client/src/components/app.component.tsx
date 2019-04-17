import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import routes from '../routes';
import actions from '../actions';
import api from '../api';
import '../stylesheet/login/app.less';

interface Props {
	logout: Function;
	auth: { isAutenticated: boolean, user: { role: string; } };
	setCurrentUser: Function;
}

interface State {
	title: string;
	content: string;
	show: boolean;
	verify: boolean;
}

class App extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			title: 'Server Side Rendering React!',
			content: 'implementation of server-side-rendering!',
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
		const { show, title, content } = this.state;

		return (
			<div>
				{
					show ? (
						<div>
							<ul>
								<li><Link to="/home">home</Link></li>
								<li><Link to="/users">users</Link></li>
								{
									auth.isAutenticated ? <li><label onClick={(): void => this.logout()} style={{ cursor: 'pointer', color: 'blue' }}>Log Out</label></li> : null
								}
								<li><Link to="/login">login</Link></li>
								<li><Link to="/asdasd">Not Found</Link></li>
							</ul>
							<h2 className="title1">{title}</h2>
							<p className="content">{content}</p>
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

import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history'; // eslint-disable-line no-unused-vars
import jwt from 'jsonwebtoken';
import routes from '../routes';
import actions from '../actions';
import api from '../api';
import '../stylesheet/login/app.less';

interface Props {
	logout: Function;
	history: History;
	auth: { isAutenticated: boolean, user: { role: string; } };
	setCurrentUser: Function;
}

interface State {
	title: string;
	content: string;
	show: boolean;
	location: string;
}

class App extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			title: 'Server Side Rendering React!',
			content: 'implementation of server-side-rendering!',
			show: false,
			location: '',
		};

		this.middleware = this.middleware.bind(this);
		this.logout = this.logout.bind(this);
		this.verify = this.verify.bind(this);
	}

	async componentDidMount(): Promise<void> {
		await this.verify();
	}

	async componentWillReceiveProps(): Promise<void> {
		this.setState({ show: false });

		const { history } = this.props;
		const { location } = this.state;

		if (history.location.pathname !== location) {
			this.setState({ location: history.location.pathname });
			await this.middleware(history.location.pathname);
		}

		this.setState({ show: true });
	}

	async verify(): Promise<void> {
		const { history }	= this.props;
		if (localStorage.token) {
			await api.usersAPi.verify(localStorage.token).then((response): void => {
				if (response) {
					const { setCurrentUser } = this.props;
					setCurrentUser(jwt.decode(localStorage.token));
				} else {
					history.push('/login');
				}
			});
		} else {
			history.push('/login');
		}
	}

	middleware(location: string): void {
		const { history }	= this.props;
		const { auth } = this.props;
		switch (location) {
			case '/login':
				if (auth.isAutenticated) {
					history.goBack();
				}
				break;
			case '/users':
				if (!auth.isAutenticated) {
					history.push('/login');
				} else if (auth.user.role !== 'administrador') {
					history.goBack();
				}
				break;
			default:
				break;

		}
	}

	logout(): void {
		const { history, logout }	= this.props;
		logout();
		history.push('/login');
	}

	render(): JSX.Element {
		const { auth } = this.props;
		const { show, title, content } = this.state;
		return (
			<div>
				{
					show ? (
						<div>
							<ul>
								<li><Link to="/">home</Link></li>
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
											route: {path: string; exact: boolean; component: React.ComponentClass},
										): JSX.Element => {
											return (
												<Route
													key={route.path}
													path={route.path}
													exact={route.exact}
													component={route.component}
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

export default withRouter(connect(mapStateToProps, { logout, setCurrentUser })(App) as any);

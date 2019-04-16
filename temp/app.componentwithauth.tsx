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
	auth: { isAutenticated: boolean };
	setCurrentUser: Function;
}

interface State {
	show: boolean;
	location: History.LocationState;
	title: string;
	content: string;
	verify: boolean;
}

class App extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			title: 'Server Side Rendering React!',
			content: 'implementation of server-side-rendering!',
			location: null,
			verify: false,
			show: false,
		};

		this.auth = this.auth.bind(this);
		this.logout = this.logout.bind(this);
		this.verify = this.verify.bind(this);
	}

	componentWillMount(): void {
		const { history } = this.props;
		this.setState({ location: history.location });
	}

	async componentDidMount(): Promise<void> {
		await this.verify();
		this.setState({ show: true });
	}

	async componentWillReceiveProps(): Promise<void> {
		this.setState({ show: false });
		const { history } = this.props;
		const { location } = this.state;
		if (history.location !== location) {
			this.setState({ location: history.location, verify: false });
		}

		const { verify } = this.state;
		if (!verify) {
			await this.auth();
		}

		this.setState({ show: true });
	}

	verify(): void {
		const { history }	= this.props;
		if (localStorage.token) {
			api.usersAPi.verify(localStorage.token).then((response): void => {
				if (response) {
					const { setCurrentUser } = this.props;
					setCurrentUser(jwt.decode(localStorage.token));
					console.log(jwt.decode(localStorage.token));
				} else {
					history.push('/login');
				}
			});
		} else {
			history.push('/login');
		}
	}

	auth(): void {
		const { history }	= this.props;
		const { auth } = this.props;
		this.setState({ location: history.location, verify: true });
		if (!auth.isAutenticated) {
			console.log('redirecting to login...');
			history.push('/login');
		}
	}

	logout(): void {
		console.log('logout component');
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
										): void => {
											(
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

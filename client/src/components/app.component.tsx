import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
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
	url: History.LocationState;
	title: string;
	content: string;
	verify: boolean;
}

class App extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			title: 'Server Side Rendering React..!',
			content: 'implementation of server-side-rendering changed!',
			url: null,
			verify: false,
			show: false,
		};

		this.auth = this.auth.bind(this);
		this.logout = this.logout.bind(this);
		this.verify = this.verify.bind(this);
	}

	componentWillMount(): void {
		const { history } = this.props;
		this.setState({ url: history.location });
	}

	async componentDidMount(): Promise<void> {
		await this.verify();
		this.setState({ show: true });
	}

	async componentWillReceiveProps(): Promise<void> {
		this.setState({ show: false });
		const { history } = this.props;
		const { url } = this.state;
		if (history.location !== url) {
			this.setState({ url: history.location, verify: false });
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
		this.setState({ url: history.location, verify: true });
		if (!auth.isAutenticated) {
			console.log('redirecting to login...');
			history.push('/login');
		}
	}

	logout(): void {
		const { history }	= this.props;
		const { logout } = this.props;
		history.push('/login');
		logout();
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
									routes.map((route): any => {
										(
											<Route
												key={route.path}
												path={route.path}
												exact={route.exact}
												component={route.component}
											/>
										);
									})
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

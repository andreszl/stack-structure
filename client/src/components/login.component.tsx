import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Grid } from 'semantic-ui-react';
import actions from '../actions';

interface Props {
	login: Function;
	emailChangedLogin: Function;
}

interface State {
	username: string;
	password: string;
	countryOptions: { key: string; value: string; flag: string; text: string }[];
}

class Login extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			countryOptions: [
				{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
				{ key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
				{ key: 'al', value: 'al', flag: 'al', text: 'Albania' },
				{ key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
				{ key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
				{ key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
				{ key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
				{ key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
				{ key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
				{ key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
				{ key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
				{ key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
				{ key: 'au', value: 'au', flag: 'au', text: 'Australia' },
				{ key: 'at', value: 'at', flag: 'at', text: 'Austria' },
				{ key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
				{ key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
				{ key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
				{ key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
				{ key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
				{ key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
				{ key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
				{ key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
				{ key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
				{ key: 'bm', value: 'bm', flag: 'bm', text: 'Bermuda' },
				{ key: 'bt', value: 'bt', flag: 'bt', text: 'Bhutan' },
				{ key: 'bo', value: 'bo', flag: 'bo', text: 'Bolivia' },
				{ key: 'ba', value: 'ba', flag: 'ba', text: 'Bosnia' },
				{ key: 'bw', value: 'bw', flag: 'bw', text: 'Botswana' },
				{ key: 'bv', value: 'bv', flag: 'bv', text: 'Bouvet Island' },
				{ key: 'br', value: 'br', flag: 'br', text: 'Brazil' },
				{ key: 'vg', value: 'vg', flag: 'vg', text: 'British Virgin Islands' },
				{ key: 'bn', value: 'bn', flag: 'bn', text: 'Brunei' },
				{ key: 'bg', value: 'bg', flag: 'bg', text: 'Bulgaria' },
				{ key: 'bf', value: 'bf', flag: 'bf', text: 'Burkina Faso' },
				{ key: 'bi', value: 'bi', flag: 'bi', text: 'Burundi' },
				{ key: 'tc', value: 'tc', flag: 'tc', text: 'Caicos Islands' },
				{ key: 'kh', value: 'kh', flag: 'kh', text: 'Cambodia' },
				{ key: 'cm', value: 'cm', flag: 'cm', text: 'Cameroon' },
				{ key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
			],
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.emailChangedLogin = this.emailChangedLogin.bind(this);

	}

	async onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		const { username, password } = this.state;
		const { login } = this.props;
		await login({ username, password });
	}

	emailChangedLogin(email: string): void {
		const { emailChangedLogin } = this.props;
		emailChangedLogin(email);
	}

	render(): JSX.Element {
		const { countryOptions } = this.state;
		return (
			<div>
				<Grid centered columns={2}>
					<Grid.Column>
						<Dropdown
							placeholder="Select Country"
							fluid
							search
							selection
							options={countryOptions}
						/>
					</Grid.Column>
				</Grid>
				<form onSubmit={this.onSubmit}>
					<h1>Login</h1>
					<input
						name="username"
						placeholder="username"
						onChange={(event): void => this.emailChangedLogin(event.target.value)}
						type="text"
					/>
					<input
						name="password"
						placeholder="password"
						onChange={(event): void => this.setState({ password: event.target.value })}
						type="password"
					/>
					<button>Login</button>
				</form>
			</div>
		);
	}
}

const { login, emailChangedLogin } = actions.authActions;


export default connect(null, { login, emailChangedLogin })(Login);

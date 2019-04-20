import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Container, Button } from 'semantic-ui-react';
import actions from '../actions';
import '../stylesheet/login/login.less';

interface Props {
	login: Function;
	emailChangedLogin: Function;
}

interface State {
	username: string;
	password: string;
}

class Login extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
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
		return (
			<Grid centered>
				<Grid.Column width={16} className="menu">
					<h1>Sexus.co</h1>
				</Grid.Column>
				<Container>
					<Grid.Column width={16} className="login_box">
						<Form size="large" className="login_form">
							<Grid.Row>
								<Grid.Column className="login_field">
									<Form.Input
										fluid
										icon="user"
										iconPosition="left"
										placeholder="Correo Electronico"
										name="email"
										onChange={(event): void => this.emailChangedLogin(event.target.value)}
										type="text"
									/>
								</Grid.Column>
								<Grid.Column className="login_field">
									<Form.Input fluid icon="lock" type="password" iconPosition="left" placeholder="Contraseña" />
								</Grid.Column>
								<Grid.Column className="login_field" verticalAlign="middle" textAlign="center">
									<label className="label_password"> ¿Olvidastes tu contraseña ? </label>
								</Grid.Column>
								<Grid.Column className="login_field">
									<Button className="button_login" color="red" fluid size="large">
										INCIAR SESION
									</Button>
								</Grid.Column>
								<Grid.Column className="login_field">
									<label className="label_password"> ¿No tienes cuenta anunciate gratis? </label>
								</Grid.Column>
								<Grid.Column className="login_field">
									<Button className="button_login" color="black" fluid size="large">
										ANUNCIARME GRATIS
									</Button>
								</Grid.Column>
							</Grid.Row>
						</Form>
					</Grid.Column>
				</Container>
			</Grid>
		);
	}
}

const { login, emailChangedLogin } = actions.authActions;


export default connect(null, { login, emailChangedLogin })(Login);

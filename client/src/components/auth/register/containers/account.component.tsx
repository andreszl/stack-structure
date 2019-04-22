import React, { Component } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

export interface Props {

}

export interface State {

}

class Account extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<Form size="large" className="login_form">
				<Grid.Row>
					<Grid.Column className="login_field">
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Correo Electronico"
							name="email"
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
						<label className="label_password"> ¿No tienes cuenta? anunciate gratis! </label>
					</Grid.Column>
					<Grid.Column className="login_field">
						<Button className="button_login" color="black" fluid size="large">
							ANUNCIARME GRATIS
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Form>
		);
	}
}

export default Account;

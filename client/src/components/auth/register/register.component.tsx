import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Step, Container, Header } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import Account from './containers/account.component';
import General from './containers/general.component';
import Gallery from './containers/gallary.component';
import '../../../stylesheet/auth/register/register.less';

export interface Props {
	accountForm: { form: { input: { payload: string } }};
	generalForm: { form: { input: { payload: string } }};
}

export interface State {
	step: number;
	steps:
	{
		key: string, icon: string, title: string, description: string,
		active: boolean, completed: boolean, disabled: boolean,
	}[],
}

class Register extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			step: 1,
			steps: [
				{
					key: 'account',
					icon: 'user',
					title: 'Cuenta',
					description: 'Información de la cuenta',
					active: true,
					completed: false,
					disabled: false,
				},
				{
					key: 'general',
					icon: 'address card',
					title: 'Datos Genrales',
					description: 'Información general',
					active: false,
					completed: false,
					disabled: false,
				},
				{
					key: 'gallery',
					icon: 'images outline',
					title: 'Galería',
					description: 'Sube tus fotos y videos',
					active: false,
					completed: false,
					disabled: false,
				},
			],
		};
	}

	step() {
		const { step } = this.state;
		const { accountForm, generalForm } = this.props;
		switch (step) {
			case 1: return <Account input={accountForm.form.input.payload} />;
			case 2: return <General input={generalForm.form.input.payload} />;
			case 3: return <Gallery />;
			default: return null;
		}
	}

	nextStep() {
		const { step } = this.state;
		if (step !== 3) {
			this.setState({ step: step + 1 });
		}
		this.updateSteps(step + 1);
	}
	prevStep() {
		const { step } = this.state;
		if (step !== 1) {
			this.setState({ step: step - 1 });
		}
		this.updateSteps(step - 1);
	}
	updateSteps(step: number) {
		const { steps } = this.state;

		if (step > 1) (steps[0].active = true, steps[0].completed = true);
		else if (step === 1) (steps[0].active = true, steps[0].completed = false);
		else (steps[0].active = false, steps[0].completed = false);

		if (step > 2) (steps[1].active = true, steps[1].completed = true);
		else if (step === 2) (steps[1].active = true, steps[1].completed = false);
		else (steps[1].active = false, steps[1].completed = false);

		if (step > 3) (steps[2].active = true, steps[2].completed = true);
		else if (step === 3) (steps[2].active = true, steps[2].completed = false);
		else (steps[2].active = false, steps[2].completed = false);

		this.setState({ steps });
	}

	render() {
		const { step, steps } = this.state;
		const { accountForm, generalForm } = this.props;
		const btnNextText = step === 3 ? 'Finalizar' : 'Siguiente';
		let status = true;
		!isEmpty(accountForm.form.input.payload) && step === 1 ? status = false : null;
		!isEmpty(generalForm.form.input.payload) && step === 2 ? 	status = false : null;
		step === 3 ? status = false : null;

		return (
			<Container className="register" text>
				<Header as="h1" textAlign="center">Register page</Header>
				<Step.Group items={steps} />
				{this.step()}
				{
					step !== 1 ? <Button primary onClick={() => this.prevStep()}>Atras</Button>
						: null
				}
				<Button disabled={status} primary onClick={() => this.nextStep()}>
					{ btnNextText }
				</Button>
			</Container>
		);
	}
}

function mapStateToProps(state: {accountForm: object, generalForm: object}): object {
	return {
		accountForm: state.accountForm,
		generalForm: state.generalForm,
	};
}

export default connect(mapStateToProps)(Register);

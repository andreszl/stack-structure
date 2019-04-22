import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Steps from '../../../widgets/steps.widget';
import Account from './containers/account.component';
import General from './containers/general.component';
import Gallery from './containers/gallary.component';

export interface Props {

}

export interface State {
	step: number;
	steps: object[];
	btnNextStatus: boolean;
}

class Register extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			btnNextStatus: true,
			step: 2,
			steps: [
				{
					key: 'account',
					icon: 'user',
					title: 'Cuenta',
					description: 'Información de la cuenta',
					active: true,
					completed: false,
				},
				{
					key: 'general',
					icon: 'address card',
					title: 'Datos Genrales',
					description: 'Información general',
					className: 'activeColor',
					completed: false,
					disabled: true,
				},
				{
					key: 'gallery',
					icon: 'images outline',
					title: 'Galería',
					description: 'Sube tus fotos y videos',
					className: 'activeColor',
					completed: false,
					disabled: true,
				},
			],
		};
	}

	step() {
		const { step } = this.state;
		switch (step) {
			case 1: return <Account />;
			case 2: return <General />;
			case 3: return <Gallery />;
			default: return null;
		}
	}

	nextStep() {
		const { step } = this.state;
		if (step !== 3) {
			this.setState({ step: step + 1 });
		}
	}
	prevStep() {
		const { step } = this.state;
		if (step !== 1) {
			this.setState({ step: step - 1 });
		}
	}

	render() {
		const { step, steps, btnNextStatus } = this.state;
		const btnNextText = step === 3 ? 'Finalizar' : 'Siguiente';
		return (
			<div>
				<h1>Register page</h1>
				<Steps steps={steps} />
				{this.step()}
				{
					step !== 1 ? <Button primary onClick={() => this.prevStep()}>Atras</Button>
						: null
				}
				<Button disabled={btnNextStatus} primary onClick={() => this.nextStep()}>
					{ btnNextText }
				</Button>
			</div>
		);
	}
}

export default Register;

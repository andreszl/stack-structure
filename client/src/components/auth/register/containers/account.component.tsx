import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import actions from '../../../../actions';
import { places } from '../../../../data/colombia';

export interface Props {
	accountForm: Function;
	input: string;
}

export interface State {
	selectedCountry: string,
	selectedState: string;
}

class Account extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			selectedCountry: '',
			selectedState: '',
		};
	}

	accountForm(form: { input: string } | any = {}) {
		const { accountForm } = this.props;
		accountForm(form);
	}

	render() {
		const { selectedCountry, selectedState } = this.state;
		const { input } = this.props;
		console.log('places', places, 'selectedCountry', selectedCountry);

		const states = () => {
			const country = places.filter(({ name }) => name === selectedCountry)[0];

			return (
				<div>
					<select onChange={event => this.setState({ selectedState: event.target.value })}>
						<option value="">Select state...</option>
						{
							country.states.map(m => <option key={m.name}>{m.name}</option>)
						}
					</select>
				</div>
			);
		};

		const cities = () => {
			const country = places.filter(({ name }) => name === selectedCountry)[0];
			const state = country.states.filter(({ name }) => name === selectedState)[0];


			return (
				<div>
					<select>
						<option value="">Select city...</option>
						{
							state.cities.map(city => <option key={city.name}>{city.name}</option>)
						}
					</select>
				</div>
			);
		};


		return (
			<div>
				<h4>Account page</h4>
				<input type="text" value={input} onChange={event => this.accountForm({ input: event.target.value })} />
				<select onChange={event => this.setState({ selectedCountry: event.target.value })}>
					<option value=""> Select country...</option>
					{
						places.map((c) => {
							return <option key={c.name} value={c.name}>{c.name}</option>;
						})
					}
				</select>
				{ selectedCountry !== '' ? states() : null }
				{ selectedState !== '' ? cities() : null }
			</div>
		);
	}
}

const { accountForm } = actions.accountFormActions;

export default connect(null, { accountForm })(Account);

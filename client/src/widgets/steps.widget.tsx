import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';
import '../stylesheet/widgets/steps.less';

export interface Props {
	steps: object[]
}

export interface State {
	steps: object[];
}

class Steps extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			steps: [],
		};
	}

	componentDidMount() {
		const { steps } = this.props;
		this.setState({ steps });
	}

	render() {
		const { steps } = this.state;
		return (
			<Step.Group items={steps} />
		);
	}
}

export default Steps;

import React, { Component } from 'react';

export interface Props {

}

export interface State {

}

class General extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>General page</div>
		);
	}
}

export default General;

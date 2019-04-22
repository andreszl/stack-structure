import React, { Component } from 'react';

export interface Props {

}

export interface State {

}

class Gallery extends Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>Gallery page</div>
		);
	}
}

export default Gallery;

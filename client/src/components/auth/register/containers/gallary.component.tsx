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

	galleryForm(form: { input: string } | any = {}) {
		// const { generalForm } = this.props;
		// generalForm(form);
		console.log(form);
	}

	render() {
		return (
			<div>
				<h4>Gallery page</h4>
				<input type="text" onChange={event => this.galleryForm({ input: event.target.value })} />
			</div>
		);
	}
}

export default Gallery;

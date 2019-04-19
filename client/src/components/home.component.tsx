import React, { PureComponent } from 'react';

interface State {
	title: any;
}
class Home extends PureComponent<{}, State> {
	constructor(props) {
		super(props);
		this.state = {
			title: 'title',
		};
	}
	render() {
		const { title } = this.state;
		return (
			<div>
				<h6>{ title }</h6>
			</div>
		);
	}
}

export default Home;

import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

// class NotFound extends PureComponent {
// 	render(): JSX.Element {
// 		//this.props; // declare this!
// 		return (
// 			<div>
// 				<Dimmer active>
// 					<Loader indeterminate>Preparing Files</Loader>
// 				</Dimmer>
// 			</div>
// 		);
// 	}
// }

// export default NotFound;

const NotFound = (): any => (
	<Dimmer active>
		<Loader indeterminate>Preparing Files</Loader>
	</Dimmer>
);

export default NotFound;

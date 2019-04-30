import React, { PureComponent } from 'react';

class DumpComponent extends PureComponent {
	render() {
		const { onClick, label } = this.props;
		return (
      <button onClick={onClick}>{label}</button>
    );
  }
}

export default DumpComponent;

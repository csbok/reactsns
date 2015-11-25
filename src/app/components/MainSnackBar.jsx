'use strict';

import React		from 'react';
import Snackbar	from 'material-ui/lib/snackbar';

export default class MainSnackBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {message: ''};

	}

	componentDidMount() {
    	global.mainSnackbar = this; 
	}

	show() {
		this.refs.snackbar.show();
	}

	setMessage(msg) {
		this.setState({message:msg});
	}
	
	render() {
		return (
			<Snackbar message={this.state.message} ref="snackbar" />
		)
 	}
}

'use strict';

const React = require('react');
const Snackbar = require('material-ui/lib/snackbar');

const MainSnackBar = React.createClass({
	getInitialState: function() {
		return {message:''};
	},

	componentDidMount: function() {
    	global.mainSnackbar = this; 
	},

	show: function() {
		this.refs.snackbar.show();
	},

	setMessage: function(msg) {
		this.setState({message:msg});
	},
	
	render: function() {
		return (
			<Snackbar message={this.state.message} ref="snackbar" />
		)
 	},
});

module.exports = MainSnackBar;

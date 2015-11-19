'use strict';

const React = require('react');
const jquery = require('jquery');

const Colors = require('material-ui/lib/styles/colors');
const IconButton = require('material-ui/lib/icon-button');
const Avatar = require('material-ui/lib/avatar');
const FlatButton = require('material-ui/lib/flat-button');

const LoginDialog = require('./LoginDialog.jsx');
const JoinDialog = require('./JoinDialog.jsx');
const MainSnackBar = require('./MainSnackBar.jsx');

const userStore = require('../store/userStore');
const config = require('./config.js');

import * as UserActions from '../actions/user';
import { bindActionCreators } from 'redux';
const actions = bindActionCreators(UserActions, userStore.dispatch);

const TopBar = React.createClass({
	getInitialState: function() {
		this.login();

		userStore.subscribe(this.onLogin.bind(this));
		return {user: userStore.getState()};
	},

	homeButtonClick: function(e) {
		e.preventDefault();
	},

	logoutButtonClick: function(e) {
		e.preventDefault();

		jquery.support.cors = true;
		jquery.ajax({
			xhrFields: {
				withCredentials: true,
			},
			url: config.server+'/logout',
			dataType: 'json',
			type: 'GET',
			data: null,
			success: function(data) {
				if (data.result) {
					global.loginDialog.dismiss();
					global.mainSnackbar.setMessage('로그아웃 되었습니다.');
					global.mainSnackbar.show();
					actions.logoutUser();
				} else { 
					global.mainSnackbar.setState({message:data.message});
					global.mainSnackbar.show();
				}
			}.bind(this),
				error: function(xhr, status, err) {
					global.mainSnackbar.setMessage('예상치 못한 오류가 발생하였습니다.');
					global.mainSnackbar.show();
			}.bind(this),
		});
	},

	// url을 직접 입력하여 이동되었거나, F5로 새로고침 하였을때, 로그인이 되었는지 확인
	login: function() {
		jquery.support.cors = true;
		jquery.ajax({
			xhrFields: {
				withCredentials: true,
			},
			url: config.server+'/login_success',
			dataType: 'json',
			type: 'GET',
			data: '',
			
			success: function(data) {
				if (data.result) {
					global.loginDialog.dismiss();
					global.mainSnackbar.setMessage('로그인에 성공하였습니다');
					global.mainSnackbar.show();
					actions.loginUser(data.user.display_name, data.user.user_no);
				}
				/* else { 
					console.log("!!! " + JSON.stringify(data));
					global.mainSnackbar.setState({message:data.message});
					global.mainSnackbar.show();
				}*/
				}.bind(this),
			
			error: function(xhr, status, err) {
				this.setMessage('예상치 못한 오류가 발생하였습니다.');
				this.refs.snackbar.show();
			}.bind(this),
		});		
	},

	// redux로 부터 로그인 상태가 변경되면 호출됨
	onLogin: function() {
		this.setState({user: userStore.getState()});
	},



	render: function() {
 	let styles = {
		iconButton: {
			position: 'absolute',
			left: 0,
			backgroundColor: Colors.brown500,//deepOrange500,
			color: 'white',
		},
		iconStyle: {
			color: Colors.white,
		},
		avatar: {
			position: 'absolute',
			top: 4,
			left: 40,
		},      
		loginButton: {
			position: 'absolute',
			top: 6,
			left: 80,
			backgroundColor: Colors.brown500,//deepOrange500,
			color: 'white',
		},
		joinButton: {
			position: 'absolute',
			top: 6,
			left: 160,
			backgroundColor: Colors.brown500,//deepOrange500,
			color: 'white',
		},
		fiexedBarStyle: {
			position: 'fixed',
			marginTop:0,
			marginLeft: 0,
			backgroundColor: Colors.brown500,//deepOrange500,
			top:0,
			width: '100%',
			height: 48,
			zIndex:9998,
		},		
	};

    return (
    	<div>
    		<div style={styles.fiexedBarStyle}>
		    	<IconButton
					onClick={this.homeButtonClick.bind(null, this)}
					iconClassName="material-icons"
					style={styles.iconButton}
					iconStyle={styles.iconStyle}>
					home
				</IconButton>
				{this.state.user.isLogin ? 
					<div>
						<Avatar src="http://lorempixel.com/100/100/nature/" style={styles.avatar} />
						<FlatButton label="로그아웃"  onTouchTap={this.logoutButtonClick}  style={styles.loginButton} />
					</div>
				:
					<div>
						<FlatButton label="로그인"  onTouchTap={()=>{global.loginDialog.show();}}  style={styles.loginButton} />
						<FlatButton label="회원가입"  onTouchTap={()=>{global.joinDialog.show();}}  style={styles.joinButton} />
					</div>
				}
			</div>

			<LoginDialog />
			<JoinDialog />
			<MainSnackBar />

		</div>
		)
    },
});

module.exports = TopBar;

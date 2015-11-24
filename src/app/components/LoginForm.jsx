'use strict';
import React        from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar     from 'material-ui/lib/snackbar';
import TextField    from 'material-ui/lib/text-field';
import FontIcon     from 'material-ui/lib/font-icon';
import config       from './config.js';
import jquery       from 'jquery';

import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/user';
import userStore from '../store/userStore';

const actions = bindActionCreators(UserActions, userStore.dispatch);

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {message: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.refs.login_id.getValue().trim();
    const pw = this.refs.login_pw.getValue().trim();
    if (!id) {
      this.setState({message:'아이디를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }

    if (!pw) {
      this.setState({message:'비밀번호를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }
    
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/auth/local',
      dataType: 'json',
      type: 'POST',
      data: {username:id, password:pw},
      success: function(data) {
        if (data.result) {
          global.loginDialog.dismiss();
          global.mainSnackbar.setMessage('로그인에 성공하였습니다');
          global.mainSnackbar.show();
          actions.loginUser(data.user.display_name, data.user.user_no);
        } else { 
          this.setState({message:data.message});
          this.refs.snackbar.show();
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({message:'예상치 못한 오류가 발생하였습니다.'});
        this.refs.snackbar.show();
      }.bind(this),
    });
  }

  render() {
    let standardActions = [
      { text: 'Okay' },
    ];    
    return (
      <form onSubmit={this.handleSubmit}>
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
        <div><TextField ref="login_id" floatingLabelText="name or email" /></div>
        <div><TextField ref="login_pw" floatingLabelText="password" /></div>
        <div><RaisedButton label="로그인" primary={true} style={{width:'260px'}} onTouchTap={this.handleSubmit} /></div>
        <p>
            <RaisedButton secondary={true} style={{width:'260px'}} label="페이스북으로 로그인" labelPosition="after" onTouchTap={()=>{window.location.href=config.server+"/auth/facebook";}}>
              <FontIcon className="muidocs-icon-custom-github" />
            </RaisedButton>
        </p>
        <p>
            <RaisedButton secondary={true} style={{width:'260px'}} label="구글로 로그인" labelPosition="after" onTouchTap={()=>{window.location.href=config.server+"/auth/google";}}>
              <FontIcon className="muidocs-icon-custom-github" />
            </RaisedButton>
        </p>
      </form>
    );
  }
}


'use strict';
const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
const TextField = require('material-ui/lib/text-field');
const config = require('./config.js');
const global = require('./global.js');

var LoginForm = React.createClass({
  getInitialState () {  
    return {message: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.login_id.getValue().trim();
    var pw = this.refs.login_pw.getValue().trim();
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
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/login',
      dataType: 'json',
      type: 'POST',
      data: {id:id, pw:pw},
      success: function(data) {
        if (data.result) {
          global.loginDialog.dismiss();
          global.mainSnackbar.setMessage('로그인에 성공하였습니다');
          global.mainSnackbar.show();
        } else { 
          this.setState({message:data.message});
          this.refs.snackbar.show();
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({message:'예상치 못한 오류가 발생하였습니다.'});
        this.refs.snackbar.show();
      }.bind(this)
    });
  },




  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    
    return (
      <form onSubmit={this.handleSubmit}>
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
        <div><TextField ref="login_id" floatingLabelText="name or email" /></div>
        <div><TextField ref="login_pw" floatingLabelText="password" /></div>
        <div><RaisedButton label="로그인" primary={true} style={{width:'260px'}} onTouchTap={this.handleSubmit} /></div>
      </form>
    );
  }
});

module.exports = LoginForm;
'use strict';
const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
const TextField = require('material-ui/lib/text-field');
const config = require('./config.js');
const global = require('./global.js');
// userName
// password
// mail
var JoinForm = React.createClass({
  getInitialState () {  
    return {message: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.userName.getValue().trim();
    var pw = this.refs.password.getValue().trim();
    var mail = this.refs.mail.getValue().trim();

    if (!id) {
      this.setState({message:'아이디를 입력해주세요.' });
      this.refs.snackbar.show();
      return;
    }

    if (!pw) {
      this.setState({message:'비밀번호를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }

    if (!mail) {
      this.setState({message:'메일 주소를 입력해주세요.'});
      this.refs.snackbar.show();
    }
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/join',
      dataType: 'json',
      type: 'POST',
      data: {userName:id, password:pw, mail:mail, oauthProvider:0, oauthAccessToken:""},
      success: function(data) {
        if (data.result) {
          global.mainSnackbar.setMessage('회원가입이 성공하였습니다.');
          global.mainSnackbar.show();
          global.joinDialog.dismiss();
          global.loginDialog.show();
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
    return (
      <form onSubmit={this.handleSubmit}>
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
        <div><TextField ref="userName" floatingLabelText="name" /></div>
        <div><TextField ref="mail" floatingLabelText="email" /></div>
        <div><TextField ref="password" floatingLabelText="password" /></div>
        <div><RaisedButton label="회원가입" primary={true} style={{width:'260px'}} onTouchTap={this.handleSubmit} /></div>
      </form>
      )
  }
});

module.exports = JoinForm;
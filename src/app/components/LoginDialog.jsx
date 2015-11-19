'use strict';

const React = require('react');
const Dialog = require('material-ui/lib/dialog');

const LoginForm = require('./LoginForm.jsx');

// 로그인 다이얼로그
const LoginDialog = React.createClass({
  componentDidMount: function() {
      global.loginDialog = this.refs.loginDialog;
  },

  render: function() {
    return (
        <Dialog title="로그인하기" ref="loginDialog">
          <div style={{textAlign:'center'}}>
            <LoginForm />
          </div>
        </Dialog>      
      )
  },
});

module.exports = LoginDialog;

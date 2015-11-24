'use strict';

import React      from 'react';
import Dialog     from 'material-ui/lib/dialog';

import LoginForm  from './LoginForm.jsx';

// 로그인 다이얼로그
export default class LoginDialog extends React.Component {
  componentDidMount() {
      global.loginDialog = this.refs.loginDialog;
  }

  render() {
    return (
      <Dialog title="로그인하기" ref="loginDialog">
        <div style={{textAlign:'center'}}>
          <LoginForm />
        </div>
      </Dialog>
    )
  }
}


'use strict';

import React    from 'react';
import Dialog   from 'material-ui/lib/dialog';

import JoinForm from './JoinForm.jsx';

// 회원가입 다이얼로그
export default class JoinDialog extends React.Component {
  componentDidMount() {
    global.joinDialog = this.refs.joinDialog;
  }

  render() {
    return (
         <Dialog
            title="회원가입하기"
            ref="joinDialog">
          <div style={{textAlign:'center'}}>
            <JoinForm />
            </div>
          </Dialog>
      )
  }
}


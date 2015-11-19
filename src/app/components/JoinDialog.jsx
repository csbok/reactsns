'use strict';

const React = require('react');
const Dialog = require('material-ui/lib/dialog');

const JoinForm = require('./JoinForm.jsx');

// 회원가입 다이얼로그
const JoinDialog = React.createClass({
  componentDidMount: function() {
    global.joinDialog = this.refs.joinDialog;
  },

  render: function() {
    return (
         <Dialog
            title="회원가입하기"
            ref="joinDialog">
          <div style={{textAlign:'center'}}>
            <JoinForm />
            </div>
          </Dialog>
      )
  },
});

module.exports = JoinDialog;

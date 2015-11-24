'use strict';
import React        from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar     from 'material-ui/lib/snackbar';
import TextField    from 'material-ui/lib/text-field';
import config       from './config.js';
import jquery       from 'jquery';
// userName
// password
// mail
export default class JoinForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {message: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.refs.userName.getValue().trim();
    const pw = this.refs.password.getValue().trim();
    const mail = this.refs.mail.getValue().trim();

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

/*
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
fetch(config.server+'/join', 
{mode: 'cors', method: 'post',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
    },
 body: 'userName='+id+'&password='+pw+'&mail='+mail+'&oauthProvider=0&oauthAccessToken=""',
}).then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
        if (json.result) {
          global.mainSnackbar.setMessage('회원가입이 성공하였습니다.');
          global.mainSnackbar.show();
          global.joinDialog.dismiss();
          global.loginDialog.show();
        } else {
          this.setState({message:json.message});
          this.refs.snackbar.show();
        }
  }).catch(function(ex) {
    console.log('parsing failed', ex)
        this.setState({message:'예상치 못한 오류가 발생하였습니다.'});
        this.refs.snackbar.show();
  })
*/

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/join',
      dataType: 'json',
      type: 'POST',
      data: {id:id, pw:pw, mail:mail, oauthProvider:0, oauthAccessToken:""},
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
      }.bind(this),
    });

  }

  render() {
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
}

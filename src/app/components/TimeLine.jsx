'use strict';

import React from 'react'
import Article from './Article.jsx'
import WriteForm from './WriteForm.jsx'
import config from './config.js'
import global from './global.js'
import jquery from 'jquery'
const FlatButton = require('material-ui/lib/flat-button');

import userStore from '../store/userStore';

const LinearProgress = require('material-ui/lib/linear-progress');

export default class TimeLine extends React.Component {

  constructor(props) {
    super(props);

    userStore.subscribe(this.onLogin.bind(this));

    this.state = { user : userStore.getState(),  last_no:0, loading:true };
    this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
    this.moreButtonClick = this.moreButtonClick.bind(this);
    this.loadFromServer = this.loadFromServer.bind(this);
  }
  
  onLogin() {
    this.setState({user: userStore.getState()});
    //this.forceUpdate();
  }

  moreButtonClick() {
    this.loadFromServer();
  }

  loadFromServer() {    
    /*
    fetch(config.server+'/new')
      .then(function(response) {
      return response.json()
    }).then(function(json) {
//      console.log('parsed json', json)
        this.setState({article: json});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
*/

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },

      url: config.server+'/timeline/' + this.state.user.user_no,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(JSON.stringify(data));
        if (data && data.length > 1) {
          this.setState({last_no:data[data.length-1].article_no});
          console.log("last_no : ", this.state.last_no);
        }
        this.setState({loading: false});
        this.refs.article.appendArticle(data);
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleArticleSubmit(article) {
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/write',
      dataType: 'json',
      type: 'POST',
      data: article,
      success: function(data) {
        if (!data.result) {
          global.mainSnackbar.setMessage("로그인이 필요합니다");
          global.mainSnackbar.show();
          global.loginDialog.show();
        } else {
          //this.setState({data: data});
          this.loadFromServer();
        }
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }


  componentDidMount() {
    this.loadFromServer();
  }

  render() {
    return (
      <div>
        {this.state.user.isLogin ? <WriteForm  onArticleSubmit={this.handleArticleSubmit} user={this.state.user} /> : null} 
        {this.state.loading ? <LinearProgress mode="indeterminate" style={{marginTop:150, backgroundColor:'white'}} /> : null}        
        <Article ref="article" user={this.state.user} />
        <div  style={{textAlign:'center'}}><FlatButton label="more" onTouchTap={this.moreButtonClick} /></div>
      </div>
      );
  }
}

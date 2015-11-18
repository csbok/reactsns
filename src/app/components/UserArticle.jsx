import React from 'react'
import Article from './Article.jsx'
import config from './config.js'
import global from './global.js'
import jquery from 'jquery'

import userStore from '../store/userStore';

export default class UserArticle extends React.Component {

  constructor(props) {
    super(props);

    userStore.subscribe(this.onLogin.bind(this));

    this.state = { article: [], user : userStore.getState() };
    this.loadFromServer = this.loadFromServer.bind(this);
  }
  
  onLogin() {
    this.setState({user: userStore.getState()});
    //this.forceUpdate();
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

      url: config.server+'/user/' + this.props.user_no,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({article: data});
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
        <Article article={this.state.article}  user={this.state.user} />
      </div>
      );
  }
}

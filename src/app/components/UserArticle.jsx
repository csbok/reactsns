'use strict';

import React from 'react'
import Article from './Article.jsx'
import config from './config.js'
import jquery from 'jquery'
import userStore from '../store/userStore';

const LinearProgress = require('material-ui/lib/linear-progress');

export default class UserArticle extends React.Component {

  constructor(props) {
    super(props);

    userStore.subscribe(this.onLogin.bind(this));

    this.state = { user : userStore.getState(), loading: true, user_no : this.props.user_no };
    this.loadFromServer = this.loadFromServer.bind(this);
  }
  
  onLogin() {
    this.setState({user: userStore.getState()});
    //this.forceUpdate();
  }

  loadFromServer(user_no) {    
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

      url: config.server+'/user/' + user_no,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.user_no !== this.state.user_no) {
      const user_no = nextProps.user_no;
      this.refs.article.clearArticle();
      this.setState({user_no: user_no});
      this.loadFromServer(user_no);      
    }
  }


  componentDidMount() {
    this.loadFromServer(this.state.user_no);
  }

  render() {
    return (
      <div>
          {this.state.loading ? <LinearProgress mode="indeterminate" style={{marginTop:150, backgroundColor:'white'}} /> : null}

        <Article ref="article" user={this.state.user} />
      </div>
      );
  }
}

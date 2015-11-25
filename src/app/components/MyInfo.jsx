'use strict';

import React      from 'react';
import DropZone   from './DropZone.jsx';
import config     from './config.js';
import jquery     from 'jquery';

import FollowList from './FollowList.js';
import userStore  from '../store/userStore';

export default class MyInfo extends React.Component {
  constructor(props) {
    super(props);

    userStore.subscribe(this.onLogin.bind(this));
    this.state = {userName:'', following:0, follower:0, article_count: 0, comment_count:0, user: userStore.getState()};
  }

  onLogin() {
    this.setState({user: userStore.getState()});
    //this.forceUpdate();
  }

  componentDidMount() {
    this.communi();
  }

  communi() {
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },

      url: config.server+'/info/' + this.state.user.user_no,
      dataType: 'json',
      cache: false,
            type: 'GET',
      success: function(data) {
        this.setState({userName: data.user_name, following:data.following_count, follower:data.follower_count, article_count:data.article_count, comment_count:data.comment_count});
//        this.setState({article: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(config.server, status, err.toString());
      }.bind(this),
    });
  }

  getFollowing() {
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/following/' + this.state.user.user_no,
      dataType: 'json',
      type: 'GET',
      data: null,
      success: function(data) {
        this.setState({listdata:data});
        this.refs.followListDialog.show(); 
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  getFollower() {
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/follower/' + this.state.user.user_no,
      dataType: 'json',
      type: 'GET',
      data: null,
      success: function(data) {
        this.setState({listdata:data});
        this.refs.followListDialog.show(); 
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }


  render() {
    return (
        <div>
                        { this.state.user.user_no}

          <div>{this.state.userName}</div>
          <div onTouchTap={this.getFollowing}>Following : {this.state.following}</div>
          <div onTouchTap={this.getFollower}>Follower : {this.state.follower}</div>
          <div>Article Count : {this.state.article_count}</div>
          <DropZone />
          <FollowList ref="followListDialog" listdata={this.state.listdata} />
        </div>
      )
  }
}


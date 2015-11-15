'use strict';

const React = require('react');
const DropZone = require('./DropZone.jsx');
const config = require('./config.js');
const jquery = require('jquery');

const FollowList = require('./FollowList.js');
import userStore from '../store/userStore';

const MyInfo = React.createClass({
  getInitialState: function() {
    userStore.subscribe(this.onLogin.bind(this));
    return {userName:'', following:0, follower:0, article_count: 0, comment_count:0, user: userStore.getState()};
  },

  onLogin: function() {
    this.setState({user: userStore.getState()});
    //this.forceUpdate();
  },
 componentDidMount: function() {
    this.communi();
  },

  communi: function() {

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
  },

  getFollowing: function() {
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
  },

  getFollower: function() {
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
  },  


  render: function() {
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
  },
});

module.exports = MyInfo;

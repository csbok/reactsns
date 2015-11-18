'use strict';

const React = require('react');
const config = require('./config.js');
const jquery = require('jquery');

const FollowList = require('./FollowList.js');
const UserArticle = require('./UserArticle.jsx');

const UserInfo = React.createClass({
  getInitialState: function() {
    return {userName:'', following:0, follower:0, article_count: 0, comment_count:0};
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

      url: config.server+'/info/' + this.props.params.user_no,
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
      url: config.server+'/following/' + this.props.params.user_no,
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
      url: config.server+'/follower/' + this.props.params.user_no,
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
          { this.props.params.user_no }

          <div>{this.state.userName}</div>
          <div onTouchTap={this.getFollowing}>Following : {this.state.following}</div>
          <div onTouchTap={this.getFollower}>Follower : {this.state.follower}</div>
          <div>Article Count : {this.state.article_count}</div>
          <FollowList ref="followListDialog" listdata={this.state.listdata} />
          <UserArticle user_no={this.props.params.user_no} />
        </div>
      )
  },
});

module.exports = UserInfo;

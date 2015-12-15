'use strict';

const React = require('react');
const config = require('./config.js');
const jquery = require('jquery');

const FollowList = require('./FollowList.js');
const UserArticle = require('./UserArticle.jsx');

const TopBar = require('./TopBar.jsx');

const Avatar = require('material-ui/lib/avatar');


const UserInfo = React.createClass({
  getInitialState: function() {
    return {userName:'', following:0, follower:0, article_count: 0, comment_count:0, user_no:this.props.params.user_no};
  },
 componentDidMount: function() {
    this.communi(this.state.user_no);
  },

  componentWillReceiveProps:function(nextProps) {
    if (nextProps.params.user_no !== this.state.user_no) {
    const user_no = nextProps.params.user_no;
    this.setState({user_no: user_no});

    this.communi(user_no);
  }
  },
  communi: function(user_no) {
    console.log("communi!");
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },

      url: config.server+'/info/' + user_no,
      dataType: 'json',
      cache: false,
            type: 'GET',
      success: function(data) {
        this.setState({userName: data.display_name, following:data.following_count, follower:data.follower_count, article_count:data.article_count, comment_count:data.comment_count});
//        this.forceUpdate();
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
      url: config.server+'/following/' + this.state.user_no,
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
      url: config.server+'/follower/' + this.state.user_no,
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
      let padding = 400;
 let styles = {
      avatar: {
        position: 'absolute',
        top: 4,
        left: 40,
        marginRight: padding,
      },      
     
      tabs: {
        position: 'relative',
        top: 60,
        padding: 50,
      },
    };    
    return (
		<div>
			<TopBar />
 

            <div style={styles.tabs}>
              <Avatar src="http://lorempixel.com/100/100/nature/" style={styles.avatar} size="80" />
          <div style={{ position: 'relative',left:250}}>
          { this.state.user_no }
            <div>{this.state.userName}</div>
            <div onTouchTap={this.getFollowing}>Following : {this.state.following}</div>
            <div onTouchTap={this.getFollower}>Follower : {this.state.follower}</div>
            <div>Article Count : {this.state.article_count}</div>
          </div>
          <FollowList ref="followListDialog" listdata={this.state.listdata} />
          <UserArticle user_no={this.state.user_no} />
          </div>
        </div>
      )
  },
});

module.exports = UserInfo;

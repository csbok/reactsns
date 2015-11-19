'use strict';

const React = require('react');
const config = require('./config.js');
const jquery = require('jquery');

const FollowList = require('./FollowList.js');
const UserArticle = require('./UserArticle.jsx');

const Colors = require('material-ui/lib/styles/colors');
const IconButton = require('material-ui/lib/icon-button');
const Avatar = require('material-ui/lib/avatar');
const FlatButton = require('material-ui/lib/flat-button');

const UserInfo = React.createClass({
  getInitialState: function() {
    return {userName:'', following:0, follower:0, article_count: 0, comment_count:0, user_no:this.props.params.user_no};
  },
 componentDidMount: function() {
  },

  componentWillReceiveProps:function(nextProps) {
    this.setState({user_no: nextProps.params.user_no});
    this.communi(this.state.user_no);
  },
  communi: function() {

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },

      url: config.server+'/info/' + this.state.user_no,
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
      contentContainerStyle: {
        marginLeft: -padding,
      },
      div: {
        position: 'absolute',
        left: 48,
        backgroundColor: Colors.cyan500,
        width: '100%',
        height: 48,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
//        fontWeight: Typography.fontWeightNormal,
//        color: Typography.textDarkBlack,
      },
      loginButton: {
        position: 'absolute',
        top: 6,
        left: 80,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      joinButton: {
        position: 'absolute',
        top: 6,
        left: 160,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      avatar: {
        position: 'absolute',
        top: 4,
        left: 40,
        marginRight: padding,
      },      
      iconButton: {
        position: 'absolute',
        left: 0,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      iconStyle: {
        color: Colors.white,
      },
      tabs: {
        position: 'relative',
        top: 60,
        padding: 50,
      },
      tabsContainer: {
        position: 'relative',
//        paddingLeft: padding,
      },
    };    
    return (
          <div style={styles.tabsContainer}>
            <IconButton
              iconClassName="material-icons"
              style={styles.iconButton}
              iconStyle={styles.iconStyle}>
              home
            </IconButton>
            <div style={styles.div}/>
              <Avatar src="http://lorempixel.com/100/100/nature/" style={styles.avatar} />
                <div>
                  <FlatButton label="로그인"  onTouchTap={()=>{global.loginDialog.show();}}  style={styles.loginButton} />
                  <FlatButton label="회원가입"  onTouchTap={()=>{global.joinDialog.show();}}  style={styles.joinButton} />
                </div>
 

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

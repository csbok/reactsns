'use strict';

const React = require('react');
const DropZone = require('./DropZone.jsx');
const config = require('./config.js');

var MyInfo = React.createClass({
  communi: function() {
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },

      url: config.server+'/info/curtis',
      dataType: 'json',
      cache: false,
            type: 'GET',
      success: function(data) {
        this.setState({userName: data.name, following:data.following, follower:data.follower, article_count:data.article_count});
//        this.setState({article: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(config.server, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState : function() {
    return {userName:'', following:0, follower:0, article_count: 0};
  },
  render: function() {
    return (
        <div>
          <div>{this.state.userName}</div>
          <div>Following : {this.state.following}</div>
          <div>Follower : {this.state.follower}</div>
          <div>Article Count : {this.state.article_count}</div>
            <DropZone />
        </div>
      )
  }
});

module.exports = MyInfo;
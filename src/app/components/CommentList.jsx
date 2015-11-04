'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');
const Avatar = require('material-ui/lib/avatar');
const config = require('./config.js');
const global = require('./global.js');

var CommentWrite = React.createClass({
  handleArticleSubmit: function(comment) {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/comment/'+this.props.article_no,
      dataType: 'json',
      type: 'POST',
      data: {comment:comment},
      success: function(data) {
        if (!data.result) {
          global.mainSnackbar.setMessage("로그인이 필요합니다.");
          global.mainSnackbar.show();
          global.loginDialog.show();
          return;
        }
        this.props.onRefreshCommentList();
        this.refs.comment.setValue('');
        //this.setState({data: data});
//        this.componentDidMount();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.server, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var comment = this.refs.comment.getValue().trim();
    if (!comment) {
      return;
    }
//    this.props.onArticleSubmit({content: content});
    this.handleArticleSubmit(comment);

    return;
  },
  render: function() {
    return (
    <div>
    <Avatar   src="http://lorempixel.com/100/100/nature/" />
    test
      <TextField 
    floatingLabelText="여기에 글을 쓰세요." ref="comment" />
          <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit}  />

    </div>      
      )
  }
});

var CommentList = React.createClass({
    getInitialState () {  
    return {comment: /*this.props.comment*/[]};
  },
 onRefreshCommentList: function() {
    this.componentDidMount();
 },

 componentDidMount : function() {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/comment/'+this.props.article_no,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({comment : data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.server, status, err.toString());
      }.bind(this)
    });
  },

  render : function() {
    var commentNodes = this.state.comment.map(function(comment) {
        return(
          <div key={comment.comment_no}>{comment.user.userName} {comment.comment}</div>
        );});


    return (
      <div>
        {commentNodes}
        { global.isLogin ? <CommentWrite onRefreshCommentList={this.onRefreshCommentList} article_no={this.props.article_no} /> : null } 
      </div>
      )
  }
});

module.exports = CommentList;
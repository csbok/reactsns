'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');
const Avatar = require('material-ui/lib/avatar');
const config = require('./config.js');
const global = require('./global.js');
const jquery = require('jquery');

const CommentWrite = React.createClass({
  handleArticleSubmit: function(comment) {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
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
      }.bind(this),
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    const comment = this.refs.comment.getValue().trim();
    if (!comment) {
      return;
    }
//    this.props.onArticleSubmit({content: content});
    this.handleArticleSubmit(comment);

    return;
  },
  render: function() {
    return (
    <div style={{width:'100%',textAlign:'center'}}>
    <Avatar src="http://lorempixel.com/100/100/nature/" style={{verticalAlign:'middle'}} />
    <div style={{display:'inline-block',width:'80px',verticalAlign:'middle',textAlign:'left',margin:'5px'}}>{this.props.user.userName}</div>
      <TextField ref="comment" style={{verticalAlign:'middle', width:'260px'}} />
      <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit}  style={{verticalAlign:'middle'}} />
    </div>      
      )
  },
});

const CommentList = React.createClass({
    getInitialState () {  
    return {comment: this.props.comment};
  },
 onRefreshCommentList: function() {
    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/comment/'+this.props.article_no,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({comment : data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.server, status, err.toString());
      }.bind(this),
    });
 },

  render : function() {
    const commentNodes = this.state.comment.map(function(comment) {
        return(
          <div key={comment.comment_no} style={{marginLeft:'5px'}}><div style={{display:'inline-block',width:'100px'}}>{comment.display_name}</div> {comment.comment}</div>
        );});


    return (
      <div>
        {commentNodes}
        {this.props.user.isLogin ? <CommentWrite onRefreshCommentList={this.onRefreshCommentList} article_no={this.props.article_no} user={this.props.user} /> : null} 
      </div>
      )
  },
});

module.exports = CommentList;

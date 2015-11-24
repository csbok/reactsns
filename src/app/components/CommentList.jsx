'use strict';

import React        from 'react';
import FlatButton   from 'material-ui/lib/flat-button';
import TextField    from 'material-ui/lib/text-field';
import Avatar       from 'material-ui/lib/avatar';
import config       from './config.js';
import jquery       from 'jquery';

import { Link } from 'react-router'

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
    }

  handleArticleSubmit(comment) {
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = this.refs.comment.getValue().trim();
    if (!comment) {
      return;
    }
//    this.props.onArticleSubmit({content: content});
    this.handleArticleSubmit(comment);

    return;
  }

  render() {
    return (
    <div style={{width:'100%',textAlign:'center'}}>
    <Avatar src="http://lorempixel.com/100/100/nature/" style={{verticalAlign:'middle'}} />
    <div style={{display:'inline-block',width:'80px',verticalAlign:'middle',textAlign:'left',margin:'5px'}}>{this.props.user.userName}</div>
      <TextField ref="comment" style={{verticalAlign:'middle', width:'260px'}} />
      <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit}  style={{verticalAlign:'middle'}} />
    </div>      
      )
  }
}

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {comment: this.props.comment};

        this.onRefreshCommentList = this.onRefreshCommentList.bind(this);
    }

 onRefreshCommentList() {
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
 }

  render() {
    const commentNodes = this.state.comment.map(function(comment) {
        return(
          <div key={comment.comment_no} style={{marginLeft:'5px'}}><div style={{display:'inline-block',width:'100px'}}><Link to={`/user/${comment.user_no}`}>{comment.display_name}</Link></div> {comment.comment}</div>
        );});


    return (
      <div>
        {commentNodes}
        {this.props.user.isLogin ? <CommentWrite onRefreshCommentList={this.onRefreshCommentList} article_no={this.props.article_no} user={this.props.user} /> : null} 
      </div>
      )
  }
}


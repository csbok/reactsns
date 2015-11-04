import React from 'react'
import Article from './Article.jsx'
import WriteForm from './WriteForm.jsx'
import config from './config.js'
import global from './global.js'

export default class NewArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { article: [] };
    this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
    this.loadFromServer = this.loadFromServer.bind(this);
  }
  

  loadFromServer() {    
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },

      url: config.server+'/new',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({article: data});
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleArticleSubmit(article) {
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/write',
      dataType: 'json',
      type: 'POST',
      data: article,
      success: function(data) {
        if (!data.result) {
          global.mainSnackbar.setMessage("로그인이 필요합니다");
          global.mainSnackbar.show();
          global.loginDialog.show();
        } else {
          //this.setState({data: data});
          this.loadFromServer();
        }
      }.bind(this),
      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }


  componentDidMount() {
    this.loadFromServer();
  }

  render() {
    return (
      <div>
        {global.isLogin ? <WriteForm  onArticleSubmit={this.handleArticleSubmit} /> : null }
        <Article article={this.state.article}  />
      </div>
      );
  }
}

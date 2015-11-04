'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const config = require('./config.js');
const global = require('./global.js');

var GoodButton = React.createClass({
  getInitialState () {  
    var good = '';
    this.props.already ?  good = '좋아요 취소' : good = '좋아요';
    return {goodMessage : good, goodCount : this.props.goodCount };
  },
 handleLikeSubmit: function(e) {
    e.preventDefault();
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/good/' + this.props.article_no,
      dataType: 'json',
      type: 'POST',
      data: '',
      success: function(data) {
        if (!data.result) {
          global.loginDialog.show();
          return;
        }

        if (data.good) {
          this.setState({goodMessage:'좋아요 취소', goodCount:this.state.goodCount+1});
        } else {
          this.setState({goodMessage:'좋아요',goodCount:this.state.goodCount-1});
        }
        //this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(config.server, status, err.toString());
      }.bind(this)
    });
  },
render: function() {
  return (
    <FlatButton label={this.state.goodMessage+this.state.goodCount} onTouchTap={this.handleLikeSubmit} />
    )
}
});

module.exports = GoodButton;
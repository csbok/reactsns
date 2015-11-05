'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const config = require('./config.js');
const global = require('./global.js');
const jquery = require('jquery');

const FollowButton = React.createClass({
  getInitialState () {  
    let follow = '';
    this.props.already ?  follow = '팔로우 해제' : follow = '팔로우 신청';
    return {followMessage : follow };
  },
 handleLikeSubmit: function(e) {
    e.preventDefault();

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/follow/' + this.props.user_no,
      dataType: 'json',
      type: 'POST',
      data: '',
      success: function(data) {
        console.log(data);
        if (!data.result) {
          global.loginDialog.show();
          return;
        }

        if (data.follow) {
          this.setState({followMessage:'팔로우 해제'});
        } else {
          this.setState({followMessage:'팔로우 신청'});
        }
        //this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(config.server, status, err.toString());
      }.bind(this),
    });
  },
render: function() {
  return (
    <FlatButton label={this.state.followMessage} onTouchTap={this.handleLikeSubmit} />
    )
},
});

module.exports = FollowButton;

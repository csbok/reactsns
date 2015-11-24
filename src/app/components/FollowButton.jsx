'use strict';

import React      from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import config     from './config.js';
import jquery     from 'jquery';


export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);

    let follow = '';
    this.props.already ?  follow = '팔로우 해제' : follow = '팔로우 신청';
    this.state = { followMessage  : follow };

    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
  }

  handleLikeSubmit(e) {
    e.preventDefault();

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/follow/' + this.props.user_no,
      dataType: 'json',
      type: 'GET',
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
  }

  render() {
    return (
      <FlatButton label={this.state.followMessage} onTouchTap={this.handleLikeSubmit} />
    )
  }
}



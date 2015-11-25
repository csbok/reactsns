'use strict';

import React      from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import config     from './config.js';
import jquery     from 'jquery';

export default class GoodButton extends React.Component {
  constructor(props) {
    super(props);

    let good = '';
    this.props.already ?  good = '좋아요 취소' : good = '좋아요';

    this.state = {goodMessage : good, goodCount : this.props.goodCount };

    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
  }

  handleLikeSubmit(e) {
    e.preventDefault();

    jquery.support.cors = true;
    jquery.ajax({
      xhrFields: {
          withCredentials: true,
      },
      url: config.server+'/good/' + this.props.article_no,
      dataType: 'json',
      type: 'GET',
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
      }.bind(this),
    });
  }

  render() {
    return (
      <FlatButton label={this.state.goodMessage+this.state.goodCount} onTouchTap={this.handleLikeSubmit} />
      )
  }
}

GoodButton.propTypes = {
  article_no: React.PropTypes.number.isRequired,
  already: React.PropTypes.bool,
  goodCount: React.PropTypes.number,
};

GoodButton.defaultProps = {
  already : false,
  goodCount : 0,
};

'use strict';

const React = require('react');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');

var WriteForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.getValue().trim();
    if (!content) {
      return;
    }
    this.props.onArticleSubmit({content: content});
    this.refs.content.setValue('');
    return;
  },
	render: function() {
		return (
			<Card style={{margin:'20px auto', maxWidth:'500px'}}>
			  <CardHeader
			    title="Demo Url Based Avatar"
			    subtitle="Subtitle"
			    avatar="http://lorempixel.com/100/100/nature/"/>
			<div style={{paddingLeft:'10px', paddingRight:'10px'}}>
				<TextField  style={{width:'100%'}}
				  floatingLabelText="여기에 글을 쓰세요."
				  multiLine={true} rows="5" ref="content" />
			</div>
			  <CardActions style={{textAlign:'right'}}>
			    <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit} />
			  </CardActions>
			</Card>
			)
		}	
});

module.exports = WriteForm;
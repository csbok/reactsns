'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');
const GoodButton = require('./GoodButton.jsx');
const FollowButton = require('./FollowButton.jsx');

const CommentList = require('./CommentList.jsx');
const Article = React.createClass({
	render: function() {
    const user = this.props.user;
    const commentNodes = this.props.article.map(function (card) {
		return (
<Card key={card.article_no} style={{margin:'20px auto', maxWidth:'500px'}}>
  <CardHeader
    title={card.author}
    subtitle="Subtitle"
    avatar="http://lorempixel.com/100/100/nature/"/>
  <CardText>
  {card.content}
  </CardText>
  <CardActions style={{textAlign:'right'}}>
    <GoodButton article_no={card.article_no} already={card.good_already} goodCount={card.good_count} />
    <FollowButton user_no={card.user_no} already={false} />
  </CardActions>
  <CardActions>
  </CardActions>
  <CommentList article_no={card.article_no} user={user} />
  }
</Card>
			);});

	 return (
        <div>{commentNodes}</div>
    );    

	},
});

module.exports = Article;

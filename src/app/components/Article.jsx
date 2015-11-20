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

import { Link } from 'react-router'

const Article = React.createClass({
  getInitialState () {  
    return {article_list : [] };
  },

  appendArticle: function(data) {
    console.log("append ", JSON.stringify(data));
    this.setState({article_list: this.state.article_list.concat(data)});
    console.log("finish : ", JSON.stringify(this.state.article_list));
    this.forceUpdate();
  },

	render: function() {
    const user = this.props.user;
    const commentNodes = this.state.article_list.map(function (card) {
		return (
<Card key={card.article_no} style={{margin:'20px auto', maxWidth:'500px'}}>
  <Link to={`/user/${card.user_no}`}><CardHeader
    title={card.author}
    subtitle="Subtitle"
    avatar="http://lorempixel.com/100/100/nature/"/></Link>
  <CardText>
  {card.content}
  </CardText>
  <CardActions style={{textAlign:'right'}}>
    <GoodButton article_no={card.article_no} already={card.good_already} goodCount={card.good_count} />
    <FollowButton user_no={card.user_no} already={card.follow_already} />
  </CardActions>
  <CardActions>
  </CardActions>
  <CommentList article_no={card.article_no} comment={card.comment_list} user={user} />
  }
</Card>
			);});

	 return (
        <div>{commentNodes}</div>
    );    

	},
});

module.exports = Article;

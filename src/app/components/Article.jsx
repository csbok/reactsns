'use strict';

import React        from 'react'
import FlatButton   from 'material-ui/lib/flat-button';
import Card         from 'material-ui/lib/card/card';
import CardHeader   from 'material-ui/lib/card/card-header';
import CardMedia    from 'material-ui/lib/card/card-media';
import CardTitle    from 'material-ui/lib/card/card-title';
import CardActions  from 'material-ui/lib/card/card-actions';
import CardText     from 'material-ui/lib/card/card-text';
import GoodButton   from './GoodButton.jsx';
import FollowButton from'./FollowButton.jsx';
import CommentList  from './CommentList.jsx';

import { Link } from 'react-router'

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {article_list: []};
  }

  appendArticle(data) {
    console.log("append ", JSON.stringify(data));
    this.setState({article_list: this.state.article_list.concat(data)});
    console.log("finish : ", JSON.stringify(this.state.article_list));
//    this.forceUpdate();
  }

  clearArticle() {
    this.setState({article_list: []});

  }

  render() {
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

	}
}

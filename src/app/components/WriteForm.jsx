'use strict';

import React        from 'react';
import Card         from 'material-ui/lib/card/card';
import CardHeader   from 'material-ui/lib/card/card-header';
import CardTitle    from 'material-ui/lib/card/card-title';
import CardActions  from 'material-ui/lib/card/card-actions';
import FlatButton   from 'material-ui/lib/flat-button';
import TextField    from 'material-ui/lib/text-field';

export default class WriteForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let content = this.refs.content.getValue().trim();
    if (!content) {
      return;
    }
    this.props.onArticleSubmit({content: content});
    this.refs.content.setValue('');
    return;
  }

  render() {
    return (
      <Card style={{margin:'20px auto', maxWidth:'500px'}}>
        <CardHeader
          title={this.props.user.userName}
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
}

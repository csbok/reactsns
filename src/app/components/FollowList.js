'use strict';

import React        from 'react';
import Dialog       from 'material-ui/lib/dialog';
import FollowButton from './FollowButton.jsx';

export default class FollowList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {listdata: []};

    this.show = this.show.bind(this);
  }

  show() {
    this.setState({listdata: this.props.listdata});
    this.refs.followListDialog.show();
  }

  render() {
  const commentNodes = this.state.listdata.map(function(item) {
    return(
      <div key={item.user_no} style={{marginLeft:'5px'}}>
        <div style={{display:'inline-block',width:'100px'}}>{item.user_name}</div>
        <FollowButton user_no={item.user_no} already={item.follow_already} />
       </div>
    );});

		return (
<Dialog
  title="Dialog With Scrollable Content"
  autoDetectWindowHeight={true}
  autoScrollBodyContent={true}
  isOpen={true}
  ref="followListDialog"
>
  <div style={{height: '1000px'}}>
    Really long content<br />
    {commentNodes}
  </div>
</Dialog>

			);
  }

}

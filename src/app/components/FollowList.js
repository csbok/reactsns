'use strict';

const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const FollowButton = require('./FollowButton.jsx');

const FollowList = React.createClass({
  getInitialState : function() {
    return {listdata: []};
  },

  show: function() {
    this.setState({listdata: this.props.listdata});
    this.refs.followListDialog.show();
  },

	render: function() {
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
  },

});

module.exports = FollowList;

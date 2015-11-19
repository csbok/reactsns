/** In this file, we create a React component which incorporates components provided by material-ui */
'use strict';

const React = require('react');

const Colors = require('material-ui/lib/styles/colors');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

const TopBar = require('./TopBar.jsx');

const Main = React.createClass({
  getInitialState: function() {

    return { tabsValue:''};
  },


  _handleTabChange(value, e, tab) {
    if (!isNaN(value)) {
      this.props.history.pushState(null, tab.props.route);
    }
//    this.setState({tabIndex: this._getSelectedIndex()});
  },


  render: function() {

  let padding = 400;
  let styles = {
      tab: {
        backgroundColor:Colors.brown500,
      },
      tabsContainer: {
        position: 'fixed',
        left: '40%',
        width:'60%',
        top:0,
        marginTop:0,

        zIndex:9999,
      },
      content: {
        marginTop:72,
      },
    };

    return (
      <div>
        <TopBar />
           <div>
              <Tabs
              value={this.state.tabIndex}
              style={styles.tabsContainer}
              onChange={this._handleTabChange}
                contentContainerStyle={styles.contentContainerStyle}>
                <Tab label="새로운 글" value="1" route="/" style={styles.tab}>
                </Tab>
                <Tab label="내 정보" value="2" route="/myinfo" style={styles.tab}>
                </Tab>
                <Tab label="타임라인" value="3" route="/timeline"  style={styles.tab}>
                </Tab>
                <Tab label="로그인" value="4" route="/login" style={styles.tab}>
                </Tab>
              </Tabs>
          </div>
          <div style={styles.content}>{this.props.children}</div>

      </div>
    );
  },

});


module.exports = Main;

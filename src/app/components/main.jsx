/** In this file, we create a React component which incorporates components provided by material-ui */
'use strict';

import React    from 'react';
import Colors   from 'material-ui/lib/styles/colors';
import Tabs     from 'material-ui/lib/tabs/tabs';
import Tab      from 'material-ui/lib/tabs/tab';
import TopBar   from './TopBar.jsx';
import userStore 	from '../store/userStore';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

		userStore.subscribe(this.onLogin.bind(this));
    this.state = {tabIndex : 0, user: userStore.getState()};

    this._handleTabChange = this._handleTabChange.bind(this);
  }
  
	// redux로 부터 로그인 상태가 변경되면 호출됨
	onLogin() {
		this.setState({user: userStore.getState()});
	}


  _handleTabChange(value, e, tab) {
    if (!isNaN(value)) {
      this.props.history.pushState(null, tab.props.route);
    }
//    this.setState({tabIndex: this._getSelectedIndex()});
  }


  render() {

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
        {this.state.user.isLogin ? 
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
                 
              </Tabs>
          : 
              <Tabs
              value={this.state.tabIndex}
              style={styles.tabsContainer}
              onChange={this._handleTabChange}
                contentContainerStyle={styles.contentContainerStyle}>
                <Tab label="새로운 글" value="1" route="/" style={styles.tab}>
                </Tab>

                <Tab label="로그인" value="4" route="/login" style={styles.tab}>
                </Tab>
                                 
              </Tabs>
          }
          </div>
          <div style={styles.content}>{this.props.children}</div>

      </div>
    );
  }

};


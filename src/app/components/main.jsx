/** In this file, we create a React component which incorporates components provided by material-ui */
'use strict';

const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');
const FlatButton = require('material-ui/lib/flat-button');
const Avatar = require('material-ui/lib/avatar');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const Snackbar = require('material-ui/lib/snackbar');
const IconButton = require('material-ui/lib/icon-button');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

const MyInfo = require('./MyInfo.jsx');
const WriteForm = require('./WriteForm.jsx');
const Article = require('./Article.jsx');
const JoinForm = require('./JoinForm.jsx')
const LoginForm = require('./LoginForm.jsx');

const config = require('./config.js');
const global = require('./global.js');

var MainSnackBar = React.createClass({
  getInitialState: function() {
    return {message:''};
  },
 componentDidMount: function() {
    global.mainSnackbar = this; 
  },
  show: function() {
    this.refs.snackbar.show();
  },
  setMessage: function(msg) {
    this.setState({message:msg});
  },

  render: function() {
    return (
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
          )
  }
})

var JoinDialog = React.createClass({
 componentDidMount: function() {
    global.joinDialog = this.refs.joinDialog;
  },

  render: function() {
    return (
         <Dialog
            title="회원가입하기"
            ref="joinDialog">
          <div style={{textAlign:'center'}}>
            <JoinForm />
            </div>
          </Dialog>
      )
  }
});

var LoginDialog = React.createClass({
   componentDidMount: function() {
      global.loginDialog = this.refs.loginDialog;
    },

  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    

    return (
       <Dialog
          title="로그인하기"
          ref="loginDialog">
          <div style={{textAlign:'center'}}>
          <LoginForm />
          </div>
        </Dialog>      
      )
  }
});


var Main = React.createClass({
  getInitialState: function() {
    return { tabsValue:''};
  },

  _handleTabChange(value, e, tab) {
//    this.refs.myInfo.communi();
    this.props.history.pushState(null, tab.props.route);
//    this.setState({tabIndex: this._getSelectedIndex()});
  },

  _handleButtonClick: function() {

  },

  render: function() {
    let menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'GitHub'
  },
  {
     text: 'Disabled',
     disabled: true
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];

  let padding = 400;

 let styles = {
      contentContainerStyle: {
        marginLeft: -padding,
      },
      div: {
        position: 'absolute',
        left: 48,
        backgroundColor: Colors.cyan500,
        width: padding,
        height: 48,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
//        fontWeight: Typography.fontWeightNormal,
//        color: Typography.textDarkBlack,
      },
      loginButton: {
        position: 'absolute',
        top: 6,
        left: 80,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      joinButton: {
        position: 'absolute',
        top: 6,
        left: 160,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      avatar: {
        position: 'absolute',
        top: 4,
        left: 40,
        marginRight: padding,
      },      
      iconButton: {
        position: 'absolute',
        left: 0,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      iconStyle: {
        color: Colors.white,
      },
      tabs: {
        position: 'relative',
      },
      tabsContainer: {
        position: 'relative',
        paddingLeft: padding,
      },
    };

    return (
      <div>

 <div style={styles.tabsContainer}>
            <IconButton
              onClick={this._handleButtonClick.bind(this)}
              iconClassName="material-icons"
              style={styles.iconButton}
              iconStyle={styles.iconStyle}>
              home
            </IconButton>
            <div style={styles.div}/>
              <Avatar src="http://lorempixel.com/100/100/nature/" style={styles.avatar} />
                <FlatButton label="로그인"  onTouchTap={()=>{global.loginDialog.show();}}  style={styles.loginButton} />
                <FlatButton label="회원가입"  onTouchTap={()=>{global.joinDialog.show();}}  style={styles.joinButton} />
              <Tabs
    value={this.state.tabIndex}
              onChange={this._handleTabChange}
                              style={styles.tabs}
                contentContainerStyle={styles.contentContainerStyle}>
                <Tab label="새로운 글" value="a" route="/">
                  {this.props.children}
                </Tab>
                <Tab label="내 정보" value="b" route="/myinfo">
                  {this.props.children}
                  {/*<MyInfo ref="myInfo" />*/}
                  
                </Tab>
                <Tab label="로그인" route="/login">
                  {this.props.children}
                </Tab>
              </Tabs>
          </div>

<LoginDialog />
<JoinDialog />
<MainSnackBar />


   {/*
<AppBar
  title="Title"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
iconElementRight={<span><FlatButton style={{backgroundColor:'rgba(255,255,255,0)'}} label="Sign in"/><FlatButton label="Sign up" onTouchTap={()=>{joinDialog.show();}}/></span>} 
   />
   <LeftNav ref="leftNav" menuItems={menuItems} />
 */}
     
      </div>
    );
  }

});


module.exports = Main;

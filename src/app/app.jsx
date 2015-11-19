import NewArticle from './components/NewArticle.jsx'
import TimeLine from './components/TimeLine.jsx'

(function () {
  let React = require('react');
  let ReactDOM = require('react-dom');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Main = require('./components/main.jsx'); // Our custom react component


const createHistory = require('history/lib/createHashHistory');

const Article = require('./components/Article.jsx');
const MyInfo = require('./components/MyInfo.jsx');
const LoginForm = require('./components/LoginForm.jsx');
const JoinForm = require('./components/JoinForm.jsx');
const WriteForm = require('./components/WriteForm.jsx');
const UserInfo = require('./components/UserInfo.jsx');

const TopBar = require('./components/TopBar.jsx');

const {
  Router,
  Route,
  Redirect,
  IndexRoute,
} = require('react-router');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render((
  <Router history={createHistory({queryKey: false})}>
    <Route path="/" component={Main}>
      <IndexRoute component={NewArticle} />
      <Route path="timeline" component={TimeLine} />
      <Route path="myinfo" component={MyInfo} />
      <Route path="login" component={LoginForm} />
      <Route path="/_=_" component={NewArticle} />

    </Route>
    <Route path="/user/:user_no" component={UserInfo} />
    <Route path="/topbar" component={TopBar} />

    {/*<Redirect from="customization" to="/login" />*/}
  </Router>), document.getElementById('app'));

})();

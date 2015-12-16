'use strict';

import React from 'react'
import NewArticle from './NewArticle.jsx'

export default class NewArticleWrap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<NewArticle articleList={window.__INITIAL_STATE__} />
	);
  }
}

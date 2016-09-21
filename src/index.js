// @flow

import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';

import App from './component/App';
import ScreenMain from './component/ScreenMain';

render(
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={ScreenMain} />
    </Route>
  </Router>,
  document.getElementById('root'),
);

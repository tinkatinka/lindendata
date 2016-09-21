// @flow

import React from 'react';
import { Map as IMap, OrderedSet as IOrderedSet } from 'immutable';
import { render } from 'react-dom';

import ScreenMain from './component/ScreenMain';

render(
  <ScreenMain
    assets={IOrderedSet([
      IMap({
        x: 5,
        y: 2,
      }),
      IMap({
        x: 1,
        y: 2,
      }),
      IMap({
        x: 3,
        y: 1,
      }),
    ])}
  />,
  document.getElementById('root'),
);

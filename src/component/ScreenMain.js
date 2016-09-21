// @flow

import 'aframe';
import React from 'react';

const ScreenMain = () => (
  <a-scene
    vr-mode-ui={'enabled: true'}
  >
    <a-entity position='0 0 0'>
      <a-camera></a-camera>
    </a-entity>
    <a-assets>
    </a-assets>
  </a-scene>
);

export default ScreenMain;

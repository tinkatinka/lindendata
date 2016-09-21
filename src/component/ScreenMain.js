// @flow

import 'aframe';
import React from 'react';

const ScreenMain = (props) => {
  console.log('props', props);
  return (
    <a-scene
      vr-mode-ui={'enabled: true'}
    >
      <a-entity position='0 0 0'>
        <a-camera></a-camera>
      </a-entity>
      <a-assets>
        <a-asset-item id='cube1' src='/assets/cube1.dae'></a-asset-item>
        <a-asset-item id='cube2' src='/assets/cube2.dae'></a-asset-item>
      </a-assets>
      {props.assets.toList().map((a, idx) => <a-entity key={idx} collada-model='#cube1' position={`${a.get('x')} 0 ${a.get('y')}`} scale={`0.1 ${0.1 * idx} 0.1`} />)}
    </a-scene>
  );
};

export default ScreenMain;

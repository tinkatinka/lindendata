// @flow

import 'aframe';
import React, { Component } from 'react';
import gFetch from '../data/fetchGoogleSheet';
import { List as IList } from 'immutable';

class ScreenMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: IList(),
    };
    this.renderData = this.renderDataUnbound.bind(this);
  }

  componentWillMount() {
    gFetch(newData => {
      console.log('newData', newData);
      this.setState({
        data: newData,
      });
    });
  }

  render() {
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
        {this.renderData()}
      </a-scene>
    );
  }

  renderData;
  renderDataUnbound() {
    return this.state.data.map((o, idx) => (
      <a-box
        color='tomato'
        depth='1'
        height='1'
        key={idx}
        width='1'
      />
    ));
    // {props.assets.toList().map((a, idx) => <a-entity key={idx} collada-model='#cube1' position={`${a.get('x')} 0 ${a.get('y')}`} scale={`0.1 ${0.1 * idx} 0.1`} />)}
  }

}

export default ScreenMain;

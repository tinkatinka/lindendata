// @flow

import 'aframe';
import React, { Component } from 'react';
import gFetch from '../data/fetchGoogleSheet';
import { List as IList, Map as IMap } from 'immutable';

function adaptScale(scale) {
  if (scale < 0) {
    return -scale;
  }
  return scale;
}

let i = 0;

class ScreenMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: IList(),
    };
    this.renderData = this.renderDataUnbound.bind(this);
    this.statesAnimations = this.statesAnimationsUnbound.bind(this);
  }

  componentWillMount() {
    gFetch(newData => {
      console.log('newData', newData.toJS());
      this.setState({
        data: newData,
        stateIdxs: IMap(),
      });
    });
  }

  render() {
    return (
      <a-scene
        vr-mode-ui={'enabled: true'}
      >
        <a-entity position='4.5 0 4.5'>
          <a-camera>
            <a-entity
              cursor='fuse: true; fuseTimeout: 500'
              geometry='primitive: ring'
              material='color: black; shader: flat'
              position='0 0 -0.01'
              scale='0.0001 0.0001 0.1'
            >
              <a-animation
                attribute='scale'
                begin='click'
                easing='ease-in'
                fill='backwards'
                from='0.00005 0.00005 0.1'
                to='0.0001 0.0001 0.1'
              />
              <a-animation
                attribute='scale'
                begin='cursor-fusing'
                easing='ease-in'
                fill='forwards'
                from='0.0001 0.0001 0.1'
                to='0.00005 0.00005 0.1'
              />
            </a-entity>
          </a-camera>
        </a-entity>
        <a-assets>
          <a-asset-item id='cube1' src='/assets/cube1.dae'></a-asset-item>
          <a-asset-item id='cube2' src='/assets/cube2.dae'></a-asset-item>
        </a-assets>
        {this.renderData()}
      </a-scene>
    );
  }

  statesAnimations;
  statesAnimationsUnbound(element, idx) {
    if (element.get('statesCount') <= 1) {
      return null;
    }
    const x = element.get('x');
    const z = element.get('z');
    let nextIdx = idx + 1;
    if (nextIdx > element.get('statesCount') - 1) {
      nextIdx = 0;
    }
    const prevColor = element.getIn(['colors', idx]);
    const nextColor = element.getIn(['colors', nextIdx]);
    let prevScaleY = element.getIn(['values', idx]);
    let nextScaleY = element.getIn(['values', nextIdx]);
    const prevPosY = prevScaleY / 2;
    const nextPosY = nextScaleY / 2;
    prevScaleY = adaptScale(prevScaleY);
    nextScaleY = adaptScale(nextScaleY);
    return [(
      <a-animation
        attribute='scale'
        key={++i}
        begin='click'
        ref={r => {
          if (r) {
            const listen = () => {
              this.setState({
                stateIdxs: this.state.stateIdxs.set(`${x}:${z}`, nextIdx),
              });
              r.removeEventListener('animationend', listen);
            };
            r.addEventListener('animationend', listen);
          }
        }}
        from={`0.9 ${prevScaleY} 0.9`}
        to={`0.9 ${nextScaleY} 0.9`}
      />
    ), (
      <a-animation
        attribute='color'
        key={++i}
        begin='click'
        from={`${prevColor}`}
        to={`${nextColor}`}
      />
    ), (
      <a-animation
        attribute='position'
        key={++i}
        begin='click'
        from={`${x} ${prevPosY} ${z}`}
        to={`${x} ${nextPosY} ${z}`}
      />
    )];
  }

  renderData;
  renderDataUnbound() {
    return this.state.data.map((o, idx) => {
      const x = o.get('x');
      const z = o.get('z');
      const sIdx = this.state.stateIdxs.get(`${x}:${z}`, 0);
      const color = o.getIn(['colors', sIdx]);
      let scaleY = o.getIn(['values', sIdx]);
      const posY = scaleY / 2;
      scaleY = adaptScale(scaleY);
      return (
        <a-box
          material={`color: ${color}; metalness: 0.6`}
          key={idx}
          position={`${x} ${posY} ${z}`}
          scale={`0.9 ${scaleY} 0.9`}
        >
          {this.statesAnimations(o, sIdx)}
        </a-box>
      );
    });
    // {props.assets.toList().map((a, idx) => <a-entity key={idx} collada-model='#cube1' position={`${a.get('x')} 0 ${a.get('y')}`} scale={`0.1 ${0.1 * idx} 0.1`} />)}
  }

}

export default ScreenMain;

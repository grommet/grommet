import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';

import { Grommet } from '../../Grommet';
import { Layer, LayerContainer } from '../';

class FakeLayer extends Component {
  state = {
    showLayer: false,
  }
  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ showLayer: true });
    /* eslint-enable react/no-did-mount-set-state */
  }
  render() {
    const { children, hide } = this.props;
    const { showLayer } = this.state;
    let layer;
    if (!hide && showLayer) {
      layer = (
        <Layer onEsc={() => this.setState({ showLayer: false })}>
          <div id='layer-node'>
            This is a layer
            <input />
          </div>
        </Layer>
      );
    }
    return (
      <Grommet>
        {layer}
        {children}
      </Grommet>
    );
  }
}

test('Layer renders', () => {
  const component = renderer.create(
    <Grommet>
      <Layer align='left'>
        This is a layer
      </Layer>
      <Layer align='right'>
        This is a layer
      </Layer>
      <Layer align='top'>
        This is a layer
      </Layer>
      <Layer align='bottom'>
        This is a layer
      </Layer>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Layer mounts', () => {
  const component = mount(<FakeLayer />);
  expect(component.getDOMNode()).toMatchSnapshot();
  component.unmount();
});

test('Layer invokes onEsc', () => {
  const onEsc = jest.fn();
  const component = mount(
    <Grommet>
      <LayerContainer onEsc={onEsc}>
        <input />
      </LayerContainer>
    </Grommet>
  );
  component.find('input').simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });
  expect(onEsc).toBeCalled();
  component.unmount();
});

test('Layer is accessible', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  /* eslint-disable jsx-a11y/tabindex-no-positive */
  const component = mount(
    <FakeLayer>
      <div id='body-node'>
        <input />
        <input tabIndex='10' />
      </div>
    </FakeLayer>, {
      attachTo: document.body.firstChild,
    }
  );
  /* eslint-enable jsx-a11y/tabindex-no-positive */

  let bodyNode = component.find('#body-node').getDOMNode();
  const layerNode = document.getElementById('layer-node');
  expect(bodyNode).toMatchSnapshot();
  expect(layerNode).toMatchSnapshot();

  component.setProps({ hide: true });

  bodyNode = component.find('#body-node').getDOMNode();
  expect(bodyNode).toMatchSnapshot();
  expect(document.getElementById('layer-node')).toBeNull();
});

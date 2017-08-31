import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Grommet } from '../../grommet';
import { Layer, LayerContainer } from '../';

// TODO: need because of weird bug in jest styled components
import StyledGrommet from '../../grommet/StyledGrommet';

StyledGrommet.displayName = 'StyledGrommet';

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
    const { showLayer } = this.state;
    let layer;
    if (showLayer) {
      layer = (
        <Layer onClose={() => this.setState({ showLayer: false })}>
          This is a layer
        </Layer>
      );
    }
    return (
      <Grommet>
        {layer}
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


test('Layer adds custom close node', () => {
  const onClose = jest.fn();
  const component = mount(
    <Grommet>
      <LayerContainer closer={<div>custom closer</div>} onClose={onClose}>
        This is a Layer
      </LayerContainer>
    </Grommet>
  );
  expect(toJSON(component)).toMatchSnapshot();
});

test('Layer mounts', () => {
  const component = mount(<FakeLayer />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Layer unmounts', () => {
  const component = mount(<FakeLayer />);
  component.unmount();
  expect(toJSON(component)).toMatchSnapshot();
});

test('Layer invokes onClose on click close', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <Grommet>
      <LayerContainer onClose={onClose}>
        This is a Layer
      </LayerContainer>
    </Grommet>
  );
  wrapper.find('button').simulate('click');
  expect(onClose).toBeCalled();
});

test('Layer invokes onClose on esc', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <Grommet>
      <LayerContainer onClose={onClose}>
        This is a Layer
      </LayerContainer>
    </Grommet>
  );
  wrapper.find('button').simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });
  expect(onClose).toBeCalled();
});

// TODO: test Layer accessibility

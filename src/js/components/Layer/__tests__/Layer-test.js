import React, { Component } from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Layer, LayerContainer } from '../';

Enzyme.configure({ adapter: new Adapter() });

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

describe('Layer', () => {
  beforeEach(createPortal);

  ['top', 'bottom', 'left', 'right', 'center'].forEach(position => (
    [true, false, 'horizontal', 'vertical'].forEach(full => (
      ['none', 'xsmall', 'small', 'medium', 'large'].forEach(margin => (
        test(`position ${position} full ${full} margin ${margin}`, () => {
          mount(
            <Layer id='position-test' position={position} full={full} margin={margin}>
              This is a layer
            </Layer>
          );

          expectPortal('position-test').toMatchSnapshot();
        })
      ))
    ))
  ));

  test('hides', () => {
    const component = mount(
      <Layer id='hidden-test' position='hidden'>
        This is a layer
      </Layer>
    );

    expectPortal('hidden-test').toMatchSnapshot();

    component.setProps({ hidden: false });

    expectPortal('hidden-test').toMatchSnapshot();
  });

  test('plain renders', () => {
    mount(
      <Layer id='plain-test' plain={true}>
        This is a plain layer
      </Layer>
    );

    expectPortal('plain-test').toMatchSnapshot();
  });

  test('non-modal renders', () => {
    mount(
      <Layer id='non-modal-test' modal={false}>
        This is a non-modal layer
      </Layer>
    );

    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('invokes onEsc', () => {
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

  test('is accessible', () => {
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
});

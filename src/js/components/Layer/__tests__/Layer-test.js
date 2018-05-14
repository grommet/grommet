import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, renderIntoDocument, Simulate } from 'react-testing-library';
import { getByTestId, queryByTestId } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Layer, LayerContainer } from '../';

class FakeLayer extends Component {
  state = { showLayer: false }

  componentDidMount() {
    this.setState({ showLayer: true }); // eslint-disable-line
  }

  render() {
    const { children } = this.props;
    const { showLayer } = this.state;
    let layer;
    if (showLayer) {
      layer = (
        <Layer onEsc={() => this.setState({ showLayer: false })}>
          <div data-testid='test-layer-node'>
            This is a layer
            <input data-testid='test-input' />
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
  afterEach(cleanup);

  ['top', 'bottom', 'left', 'right', 'center'].forEach(position => (
    [true, false, 'horizontal', 'vertical'].forEach(full => (
      ['none', 'xsmall', 'small', 'medium', 'large'].forEach(margin => (
        test(`position ${position} full ${full} margin ${margin}`, () => {
          renderIntoDocument(
            <Layer id='position-test' position={position} full={full} margin={margin}>
              This is a layer
            </Layer>
          );
          expectPortal('position-test').toMatchSnapshot();
        })
      ))
    ))
  ));

  test('hidden', () => {
    const { rerender } = renderIntoDocument(
      <Layer id='hidden-test' position='hidden'>This is a layer</Layer>
    );
    expectPortal('hidden-test').toMatchSnapshot();

    rerender(<Layer id='hidden-test' position='center'>This is a layer</Layer>);
    expectPortal('hidden-test').toMatchSnapshot();
  });

  test('plain', () => {
    renderIntoDocument(
      <Layer id='plain-test' plain={true}>
        This is a plain layer
      </Layer>
    );
    expectPortal('plain-test').toMatchSnapshot();
  });

  test('non-modal renders', () => {
    renderIntoDocument(
      <Layer id='non-modal-test' modal={false}>
        This is a non-modal layer
      </Layer>
    );
    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('invokes onEsc', () => {
    const onEsc = jest.fn();
    renderIntoDocument(
      <Grommet>
        <LayerContainer onEsc={onEsc}>
          <input data-testid='test-input' />
        </LayerContainer>
      </Grommet>
    );

    const input = getByTestId(document, 'test-input');
    Simulate.keyDown(input, { key: 'Esc', keyCode: 27, which: 27 });
    expect(onEsc).toBeCalled();
  });

  test('is accessible', () => {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    renderIntoDocument(
      <FakeLayer>
        <div data-testid='test-body-node'>
          <input />
          <input tabIndex='10' />
        </div>
      </FakeLayer>
    );
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    let bodyNode = getByTestId(document, 'test-body-node');
    const layerNode = getByTestId(document, 'test-layer-node');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();

    const input = getByTestId(document, 'test-input');
    Simulate.keyDown(input, { key: 'Esc', keyCode: 27, which: 27 });
    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    expect(queryByTestId(document, 'test-layer-node')).toBeNull();
  });
});

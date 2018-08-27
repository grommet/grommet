import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, renderIntoDocument } from 'react-testing-library';
import { getByTestId, queryByTestId } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Box, Layer } from '../../';
import { LayerContainer } from '../LayerContainer';

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
    test(`position ${position}`, () => {
      renderIntoDocument(
        <Grommet>
          <Layer id='position-test' position={position}>
            This is a layer
          </Layer>
        </Grommet>
      );
      expectPortal('position-test').toMatchSnapshot();
    })
  ));

  [true, false, 'horizontal', 'vertical'].forEach(full => (
    test(`full ${full}`, () => {
      renderIntoDocument(
        <Grommet>
          <Layer id='full-test' full={full}>
            This is a layer
          </Layer>
        </Grommet>
      );
      expectPortal('full-test').toMatchSnapshot();
    })
  ));

  ['none', 'xsmall', 'small', 'medium', 'large'].forEach(margin => (
    test(`margin ${margin}`, () => {
      renderIntoDocument(
        <Grommet>
          <Layer id='margin-test' margin={margin}>
            This is a layer
          </Layer>
        </Grommet>
      );
      expectPortal('margin-test').toMatchSnapshot();
    })
  ));

  test('hidden', () => {
    const { rerender } = renderIntoDocument(
      <Grommet>
        <Layer id='hidden-test' position='hidden'>This is a layer</Layer>
      </Grommet>
    );
    expectPortal('hidden-test').toMatchSnapshot();

    rerender(
      <Grommet>
        <Layer id='hidden-test' position='center'>This is a layer</Layer>
      </Grommet>
    );
    expectPortal('hidden-test').toMatchSnapshot();
  });

  test('plain', () => {
    renderIntoDocument(
      <Grommet>
        <Layer id='plain-test' plain={true}>
          This is a plain layer
        </Layer>
      </Grommet>
    );
    expectPortal('plain-test').toMatchSnapshot();
  });

  test('non-modal', () => {
    renderIntoDocument(
      <Grommet>
        <Layer id='non-modal-test' modal={false}>
          This is a non-modal layer
        </Layer>
      </Grommet>
    );
    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('dark context', () => {
    renderIntoDocument(
      <Grommet>
        <Box background='dark-1'>
          <Layer id='non-modal-test' modal={false}>
            This is a non-modal layer
          </Layer>
        </Box>
      </Grommet>
    );
    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('invokes onEsc', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const onEsc = jest.fn();
    renderIntoDocument(
      <Grommet>
        <LayerContainer onEsc={onEsc}>
          <input data-testid='test-input' />
        </LayerContainer>
      </Grommet>
    );

    map.keydown({ key: 'Esc', keyCode: 27, which: 27 });
    expect(onEsc).toBeCalled();
  });

  test('is accessible', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    /* eslint-disable jsx-a11y/tabindex-no-positive */
    renderIntoDocument(
      <Grommet>
        <FakeLayer>
          <div data-testid='test-body-node'>
            <input />
            <input tabIndex='10' />
          </div>
        </FakeLayer>
      </Grommet>
    );
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    let bodyNode = getByTestId(document, 'test-body-node');
    const layerNode = getByTestId(document, 'test-layer-node');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();

    map.keydown({ key: 'Esc', keyCode: 27, which: 27 });
    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    expect(queryByTestId(document, 'test-layer-node')).toBeNull();
  });
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { getByTestId, queryByTestId } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Box, Layer } from '../..';
import { LayerContainer } from '../LayerContainer';

class FakeLayer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { showLayer: false };

  componentDidMount() {
    this.setState({ showLayer: true }); // eslint-disable-line
  }

  render() {
    const { children, ...rest } = this.props;
    const { showLayer } = this.state;
    let layer;
    if (showLayer) {
      layer = (
        <Layer onEsc={() => this.setState({ showLayer: false })}>
          <div {...rest}>
            This is a layer
            <input data-testid="test-input" />
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

  ['top', 'bottom', 'left', 'right', 'center'].forEach(position =>
    test(`position ${position}`, () => {
      render(
        <Grommet>
          <Layer id="position-test" position={position}>
            This is a layer
          </Layer>
        </Grommet>,
      );
      expectPortal('position-test').toMatchSnapshot();
    }),
  );

  [true, false, 'horizontal', 'vertical'].forEach(full =>
    test(`full ${full}`, () => {
      render(
        <Grommet>
          <Layer id="full-test" full={full}>
            This is a layer
          </Layer>
        </Grommet>,
      );
      expectPortal('full-test').toMatchSnapshot();
    }),
  );

  ['none', 'xsmall', 'small', 'medium', 'large'].forEach(margin =>
    test(`margin ${margin}`, () => {
      render(
        <Grommet>
          <Layer id="margin-test" margin={margin}>
            This is a layer
          </Layer>
        </Grommet>,
      );
      expectPortal('margin-test').toMatchSnapshot();
    }),
  );

  test(`custom margin`, () => {
    render(
      <Grommet>
        <Layer
          id="margin-test"
          margin={{ top: '50px', bottom: '40px', left: '30px', right: '20px' }}
        >
          This is a layer
        </Layer>
      </Grommet>,
    );
    expectPortal('margin-test').toMatchSnapshot();
  });

  test('hidden', () => {
    const { rerender } = render(
      <Grommet>
        <Layer id="hidden-test" position="hidden">
          This is a layer
        </Layer>
      </Grommet>,
    );
    expectPortal('hidden-test').toMatchSnapshot();

    rerender(
      <Grommet>
        <Layer id="hidden-test" position="center">
          This is a layer
        </Layer>
      </Grommet>,
    );
    expectPortal('hidden-test').toMatchSnapshot();
  });

  test('plain', () => {
    render(
      <Grommet>
        <Layer id="plain-test" plain>
          This is a plain layer
        </Layer>
      </Grommet>,
    );
    expectPortal('plain-test').toMatchSnapshot();
  });

  test('non-modal', () => {
    render(
      <Grommet>
        <Layer id="non-modal-test" modal={false}>
          This is a non-modal layer
        </Layer>
      </Grommet>,
    );
    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('dark context', () => {
    render(
      <Grommet>
        <Box background="dark-1">
          <Layer id="non-modal-test" modal={false}>
            This is a non-modal layer
          </Layer>
        </Box>
      </Grommet>,
    );
    expectPortal('non-modal-test').toMatchSnapshot();
  });

  test('invokes onEsc', () => {
    const onEsc = jest.fn();
    render(
      <Grommet>
        <LayerContainer onEsc={onEsc}>
          <input data-testid="test-input" />
        </LayerContainer>
      </Grommet>,
    );

    const inputNode = getByTestId(document, 'test-input');
    fireEvent.keyDown(inputNode, { key: 'Esc', keyCode: 27, which: 27 });
    expect(onEsc).toBeCalled();
  });

  test('is accessible', () => {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    render(
      <Grommet>
        <FakeLayer data-testid="test-layer-node">
          <div data-testid="test-body-node">
            <input />
            <input tabIndex="10" />
          </div>
        </FakeLayer>
      </Grommet>,
    );
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    let bodyNode = getByTestId(document, 'test-body-node');
    const layerNode = getByTestId(document, 'test-layer-node');
    const inputNode = getByTestId(document, 'test-input');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();

    fireEvent.keyDown(inputNode, { key: 'Esc', keyCode: 27, which: 27 });
    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    expect(queryByTestId(document, 'test-layer-node')).toBeNull();
  });

  test('should be null prior to mounting, displayed after mount', () => {
    const ref = React.createRef();
    render(
      <Grommet>
        <Layer data-testid="test-layer-container" ref={ref}>
          Layer container is available
        </Layer>
      </Grommet>,
    );

    ref.current.setState({ islayerContainerAvailable: false });
    expect(queryByTestId(document, 'test-layer-container')).toBeNull();

    ref.current.componentDidMount();
    expect(queryByTestId(document, 'test-layer-container')).toMatchSnapshot();
  });
});

import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { getByTestId, queryByTestId } from '@testing-library/dom';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Box, Layer } from '../..';
import { LayerContainer } from '../LayerContainer';

const SimpleLayer = () => {
  const [showLayer, setShowLayer] = React.useState(true);

  React.useEffect(() => setShowLayer(false), []);

  let layer;
  if (showLayer) {
    layer = <Layer data-testid="test-dom-removal">This is a test</Layer>;
  }
  return <Box>{layer}</Box>;
};

const FakeLayer = ({ children, dataTestid }) => {
  const [showLayer, setShowLayer] = React.useState(false);

  React.useEffect(() => setShowLayer(true), []);

  let layer;
  if (showLayer) {
    layer = (
      <Layer onEsc={() => setShowLayer(false)}>
        <div data-testid={dataTestid}>
          This is a layer
          <input data-testid="test-input" />
        </div>
      </Layer>
    );
  }
  return (
    <Box>
      {layer}
      {children}
    </Box>
  );
};

const TargetLayer = props => {
  const [target, setTarget] = React.useState();
  let layer;
  if (target) {
    layer = (
      <Layer {...props} target={target}>
        this is a test layer
      </Layer>
    );
  }
  return (
    <Grommet>
      <div ref={setTarget} />
      {layer}
    </Grommet>
  );
};

describe('Layer', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  ['top', 'bottom', 'left', 'right', 'start', 'end', 'center'].forEach(
    position =>
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

  ['slide', 'fadeIn', false, true].forEach(animation =>
    test(`animation ${animation}`, () => {
      render(
        <Grommet>
          <Layer id="animation-test" animation={animation}>
            This is a layer
          </Layer>
        </Grommet>,
      );
      expectPortal('animation-test').toMatchSnapshot();
    }),
  );

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

  test('is accessible', done => {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    render(
      <Grommet>
        <FakeLayer dataTestid="test-layer-node">
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
    // because of de-animation, we test both the initial and delayed states
    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    setTimeout(() => {
      expect(queryByTestId(document, 'test-layer-node')).toBeNull();
      done();
    }, 300);
  });

  test('focus on layer', () => {
    /* eslint-disable jsx-a11y/no-autofocus */
    render(
      <Grommet>
        <Layer data-testid="focus-layer-test">
          <input />
        </Layer>
        <input autoFocus />
      </Grommet>,
    );
    /* eslint-disable jsx-a11y/no-autofocus */

    const layerNode = getByTestId(document, 'focus-layer-test');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement.nodeName).toBe('A');
  });

  test('not steal focus from an autofocus focusable element', () => {
    /* eslint-disable jsx-a11y/no-autofocus */
    render(
      <Grommet>
        <Layer data-testid="focus-layer-input-test">
          <input autoFocus data-testid="focus-input" />
          <button type="button">Button</button>
        </Layer>
      </Grommet>,
    );
    /* eslint-disable jsx-a11y/no-autofocus */
    const layerNode = getByTestId(document, 'focus-layer-input-test');
    const inputNode = getByTestId(document, 'focus-input');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement).toBe(inputNode);
  });

  test('target', () => {
    render(
      <Grommet>
        <TargetLayer id="target-test">This layer has a target</TargetLayer>
      </Grommet>,
    );
    expectPortal('target-test').toMatchSnapshot();
  });

  test('target not modal', () => {
    render(
      <Grommet>
        <TargetLayer id="target-test" modal={false}>
          This layer has a target
        </TargetLayer>
      </Grommet>,
    );
    expectPortal('target-test').toMatchSnapshot();
  });

  test('unmounts from dom', () => {
    render(
      <Grommet>
        <SimpleLayer />
      </Grommet>,
    );
    setTimeout(() => {
      expect(queryByTestId(document, 'test-dom-removal')).toBeNull();
    }, 1000);
  });

  test('default containerTarget', () => {
    render(
      <Grommet>
        <Layer data-testid="layer">Test</Layer>
      </Grommet>,
    );
    const layer = getByTestId(document, 'layer');
    const actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
    expect(actualRoot).toBe(document.body);
  });

  test('custom containerTarget', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    try {
      render(
        <Grommet containerTarget={target}>
          <Layer data-testid="layer">Test</Layer>
        </Grommet>,
      );
      const layer = getByTestId(document, 'layer');
      const actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
      expect(actualRoot).toBe(target);
    } finally {
      document.body.removeChild(target);
    }
  });
});

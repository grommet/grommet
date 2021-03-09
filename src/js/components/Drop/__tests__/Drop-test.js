import React, { useState, useEffect, useRef } from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Drop } from '..';

const customTheme = {
  global: {
    drop: {
      elevation: 'large',
      background: { dark: 'neutral-2', light: 'background-contrast' },
      border: { radius: '10px' },
      zIndex: '15',
      margin: 'xsmall',
    },
  },
};

const TestInput = ({
  inputProps,
  theme,
  elevation,
  containerTarget,
  message = 'this is a test',
  ...rest
}) => {
  const [showDrop, setShowDrop] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setShowDrop(true);
  }, []);

  let drop;

  if (showDrop) {
    drop = (
      <Drop
        id="drop-node"
        elevation={elevation}
        target={inputRef.current}
        {...rest}
      >
        {message}
      </Drop>
    );
  }
  return (
    <Grommet theme={theme} containerTarget={containerTarget}>
      <input ref={inputRef} {...inputProps} aria-label="test" />
      {drop}
    </Grommet>
  );
};

describe('Drop', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    window.scrollTo = jest.fn();
    const { container } = render(<TestInput />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('basic', () => {
    window.scrollTo = jest.fn();
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left right top bottom', () => {
    render(<TestInput align={{ left: 'right', top: 'bottom' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left left', () => {
    render(<TestInput align={{ left: 'left', bottom: 'bottom' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right left top top', () => {
    render(<TestInput align={{ right: 'left', top: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right', () => {
    render(<TestInput align={{ right: 'right' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('invalid align', () => {
    render(<TestInput align={{ whatever: 'right' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('no stretch', () => {
    render(<TestInput stretch={false} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('stretch = align', () => {
    const message =
      'test test test test test test test test test test test test test test';
    render(<TestInput stretch="align" message={message} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('close', () => {
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();

    cleanup();
    expect(document.getElementById('drop-node')).toBeNull();
  });

  test('invoke onClickOutside', () => {
    const onClickOutside = jest.fn();
    render(<TestInput onClickOutside={onClickOutside} />);
    expectPortal('drop-node').toMatchSnapshot();

    fireEvent(
      document,
      new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
    );
    expect(onClickOutside).toBeCalled();
  });

  test('resize', () => {
    render(<TestInput />);
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('restrict focus', async () => {
    render(<TestInput restrictFocus />);
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();

    await waitFor(() => cleanup());

    expect(document.activeElement).toMatchSnapshot();
  });

  test('default elevation renders', () => {
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('theme elevation renders', () => {
    render(<TestInput theme={customTheme} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('elevation', () => {
    render(<TestInput theme={customTheme} elevation="medium" />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('plain', () => {
    render(<TestInput plain />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('round', () => {
    render(<TestInput round="full" />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('margin', () => {
    render(<TestInput margin="small" />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('background', () => {
    render(<TestInput background="background-contrast" />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('default containerTarget', () => {
    const { getByTestId } = render(<TestInput data-testid="drop" />);
    const actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
    expect(actualRoot).toBe(document.body);
  });

  test('custom containerTarget', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    try {
      const { getByTestId } = render(
        <TestInput data-testid="drop" containerTarget={target} />,
      );
      const actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
      expect(actualRoot).toBe(target);
    } finally {
      document.body.removeChild(target);
    }
  });
});

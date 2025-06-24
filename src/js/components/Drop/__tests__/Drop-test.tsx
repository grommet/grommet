import React, { useState, useEffect, useRef } from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { axe } from 'jest-axe';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react';

import { expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Drop, DropExtendedProps } from '..';
import { ThemeType } from '../../../themes';
import userEvent from '@testing-library/user-event';

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

const TestFocus = ({
  theme,
  containerTarget,
  message = 'this is a test',
  ...rest
}: TestInputProps) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setShowDrop(true);
  }, []);

  let drop;

  if (showDrop) {
    drop = (
      <Drop
        id="drop-node"
        restrictFocus
        target={inputRef.current || undefined}
        {...rest}
      >
        <button autoFocus aria-label="first-focus">
          first-focus
        </button>
        {message}
      </Drop>
    );
  }
  return (
    <Grommet theme={theme} containerTarget={containerTarget}>
      <input ref={inputRef} aria-label="test" />
      {drop}
    </Grommet>
  );
};
interface TestInputProps extends DropExtendedProps {
  theme?: ThemeType;
  containerTarget?: HTMLElement;
  message?: string;
}
const TestInput = ({
  theme,
  containerTarget,
  message = 'this is a test',
  ...rest
}: TestInputProps) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setShowDrop(true);
  }, []);

  let drop;

  if (showDrop) {
    drop = (
      <Drop id="drop-node" target={inputRef.current || undefined} {...rest}>
        {message}
      </Drop>
    );
  }
  return (
    <Grommet theme={theme} containerTarget={containerTarget}>
      <input ref={inputRef} aria-label="test" />
      {drop}
    </Grommet>
  );
};

interface TestButtonProps extends DropExtendedProps {
  theme?: ThemeType;
  containerTarget?: HTMLElement;
  message?: string;
}
const TestButton = ({
  theme,
  containerTarget,
  message = 'this is a test',
  ...rest
}: TestButtonProps) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setShowDrop(true);
  }, []);

  let drop;

  if (showDrop) {
    drop = (
      <Drop
        id="drop-node"
        inline
        target={buttonRef.current || undefined}
        {...rest}
      >
        {message}
      </Drop>
    );
  }
  return (
    <Grommet theme={theme} containerTarget={containerTarget}>
      <button ref={buttonRef} data-testid="drop-button" aria-label="test">
        <span>click</span>
        {drop}
      </button>
    </Grommet>
  );
};

const TestTrapFocus = () => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setShowDrop(true);
  }, []);

  let drop;

  if (showDrop) {
    drop = (
      <Drop
        id="drop-node"
        trapFocus
        restrictFocus
        target={inputRef.current || undefined}
      >
        <button aria-label="first-focus">first-focus</button>
        <button aria-label="second-focus">second-focus</button>
      </Drop>
    );
  }
  return (
    <Grommet>
      <input ref={inputRef} aria-label="test" />
      {drop}
    </Grommet>
  );
};

describe('Drop', () => {
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
    // @ts-ignore
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

  test('does not invoke onClickOutside when clicking the target', () => {
    const onClickOutside = jest.fn();
    render(<TestInput onClickOutside={onClickOutside} />);

    // Click the target
    const inputElement = screen.getByLabelText('test');
    fireEvent.click(inputElement);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  test('resize', () => {
    render(<TestInput />);
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
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

  test('restrict focus with auto focus on element inside', async () => {
    render(<TestFocus />);

    // Wait for the button with text 'first-focus'
    const button = await screen.findByText('first-focus');
    expect(button).toBeInTheDocument();

    // Check that the button is the currently focused element
    await waitFor(() => {
      expect(document.activeElement).toBe(button);
    });
  });

  test('focus does not leave the dialog when trapFocus is true', async () => {
    userEvent.setup();
    window.scrollTo = jest.fn();
    render(<TestTrapFocus />);

    // Wait for the button with text 'first-focus'
    const firstButton = await screen.findByText('first-focus');
    const secondButton = await screen.findByText('second-focus');
    expect(firstButton).toBeInTheDocument();

    await userEvent.tab();

    // Check that the button is the currently focused element
    expect(document.activeElement).toBe(firstButton);

    // Simulate tab
    await userEvent.tab();

    // Expect the focus to go to the second button
    expect(document.activeElement).toBe(secondButton);

    // Simulate tab
    await userEvent.tab();

    // Expect the focus to go back to the first button
    expect(document.activeElement).toBe(firstButton);

    // Simulate backwards tab with Shift key
    await userEvent.tab({ shift: true });
    // Expect the focus to be on the second button again
    expect(document.activeElement).toBe(secondButton);
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
    const actualRoot = getByTestId('drop')?.parentNode?.parentNode?.parentNode;
    expect(actualRoot).toBe(document.body);
  });

  const alignPositions: TestInputProps['align'][] = [
    { top: 'bottom' },
    { top: 'top', left: 'right' },
    { top: 'top', right: 'left' },
    { top: 'bottom', right: 'left' },
    { top: 'bottom', right: 'right' },
    { top: 'bottom', left: 'right' },
    { top: 'bottom', left: 'left' },
    { bottom: 'top', right: 'left' },
    { right: 'right', bottom: 'top' },
    { bottom: 'top', left: 'left' },
    { bottom: 'top', left: 'right' },
    { bottom: 'top', right: 'left' },
    { bottom: 'bottom', left: 'right' },
    { bottom: 'bottom', right: 'left' },
  ];

  alignPositions.forEach((alignPosition) => {
    const customMarginTheme = {
      global: {
        drop: {
          margin: 'small',
          intelligentMargin: true,
        },
      },
    };

    test(`should render correct margin depending on value of align: 
    ${JSON.stringify(alignPosition)}`, () => {
      render(
        <TestInput
          id="margin-drop-test"
          theme={customMarginTheme}
          align={alignPosition}
        />,
      );
      expectPortal('margin-drop-test').toMatchSnapshot();
    });
  });
});

test('custom containerTarget', () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  try {
    const { getByTestId } = render(
      <TestInput data-testid="drop" containerTarget={target} />,
    );
    const actualRoot = getByTestId('drop')?.parentNode?.parentNode?.parentNode;
    expect(actualRoot).toBe(target);
  } finally {
    document.body.removeChild(target);
  }
});

test('inline', () => {
  window.scrollTo = jest.fn();
  const { getByTestId } = render(<TestButton />);
  expect(getByTestId('drop-button')).toMatchSnapshot();
});

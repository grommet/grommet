import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';

import { Grommet, RoutedButton } from '../..';

class FakeRouter extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    router: PropTypes.shape({}),
  };

  getChildContext() {
    const { push, replace } = this.props;
    return {
      router: {
        history: {
          push,
          replace,
        },
      },
    };
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

describe('RoutedButton', () => {
  let push;
  let replace;
  let warning;
  let warnSpy;

  beforeEach(() => {
    push = jest.fn();
    replace = jest.fn();
    warning = `This component will be deprecated in the upcoming releases.
         Please refer to https://github.com/grommet/grommet/issues/2855
         for more information.`;

    console.warn = jest.fn();
    warnSpy = jest.spyOn(console, 'warn');
  });

  afterEach(() => {
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );

    expect(warnSpy).toBeCalledWith(warning);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('RoutedButton is clickable', () => {
    const preventDefault = jest.fn();
    const onClick = jest.fn();
    render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(onClick).toBeCalled();
    expect(push).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(warning);
  });

  test('RoutedButton skips onClick if right clicked', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();
    render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    await user.pointer([
      { target: anchor },
      { keys: '[MouseRight]', target: anchor },
    ]);

    expect(onClick).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(warning);
  });

  test('RoutedButton calls router context push', () => {
    const preventDefault = jest.fn();
    render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/');

    expect(warnSpy).toHaveBeenCalledWith(warning);
  });

  test('RoutedButton calls router context replace', () => {
    const preventDefault = jest.fn();
    render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" method="replace" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledWith('/');
    expect(warnSpy).toHaveBeenCalledWith(warning);
  });
});

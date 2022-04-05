import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { RoutedAnchor } from '..';

class FakeRouter extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    router: PropTypes.shape({}).isRequired,
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

describe('RoutedAnchor', () => {
  const replace = jest.fn();
  const push = jest.fn();
  let warnSpy;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );

    expect(warnSpy).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('is clickable', () => {
    const preventDefault = jest.fn();
    const onClick = jest.fn();
    render(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(onClick).toBeCalledTimes(1);
    expect(push).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(warnSpy).toHaveBeenCalled();
  });

  test('skips onClick if right clicked', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();
    render(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    await user.pointer([
      { target: anchor },
      { keys: '[MouseRight]', target: anchor },
    ]);

    expect(onClick).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });

  test('calls router context push', () => {
    const preventDefault = jest.fn();
    render(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/');
    expect(warnSpy).toHaveBeenCalled();
  });

  test('calls router context replace', () => {
    const preventDefault = jest.fn();
    render(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedAnchor label="Test" path="/" method="replace" />
        </FakeRouter>
      </Grommet>,
    );

    const anchor = screen.getByRole('link');

    const clickEvent = createEvent.click(anchor);
    clickEvent.preventDefault = preventDefault;
    fireEvent(anchor, clickEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledWith('/');
    expect(warnSpy).toHaveBeenCalled();
  });
});

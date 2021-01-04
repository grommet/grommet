import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

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
  const push = jest.fn();
  const replace = jest.fn();
  const warning = `This component will be deprecated in the upcoming releases.
         Please refer to https://github.com/grommet/grommet/issues/2855 
         for more information.`;
  test('renders', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(warnSpy).toBeCalledWith(warning);

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('RoutedButton is clickable', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const preventDefault = jest.fn();
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();
    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({ preventDefault });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();

    expect(warnSpy).toBeCalledWith(warning);

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('RoutedButton skips onClick if right clicked', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      ctrlKey: true,
    });
    anchor[0].props.onClick({
      metaKey: true,
    });
    expect(onClick).not.toBeCalled();

    expect(warnSpy).toBeCalledWith(warning);

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('RoutedButton calls router context push', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const preventDefault = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const button = findAllByType(tree, 'a');
    button[0].props.onClick({
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(push).toBeCalledWith('/');

    expect(warnSpy).toBeCalledWith(warning);

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('RoutedButton calls router context replace', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const preventDefault = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" method="replace" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const button = findAllByType(tree, 'a');
    button[0].props.onClick({
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(replace).toBeCalledWith('/');

    expect(warnSpy).toBeCalledWith(warning);

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });
});

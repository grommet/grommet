import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

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
  test('renders', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('is clickable', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const preventDefault = jest.fn();
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({ preventDefault });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('skips onClick if right clicked', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" onClick={onClick} path="/" />
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
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('calls router context push', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const preventDefault = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push} replace={replace}>
          <RoutedAnchor label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(push).toBeCalledWith('/');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('calls router context replace', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const preventDefault = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace} push={push}>
          <RoutedAnchor label="Test" path="/" method="replace" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(replace).toBeCalledWith('/');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

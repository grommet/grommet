import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { RoutedButton } from '../';

import { findAllByType } from '../../utils';

test('RoutedButton renders', () => {
  const component = renderer.create(
    <Grommet>
      <RoutedButton label='Test' path='/' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RoutedButton is clickable', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <RoutedButton label='Test' onClick={onClick} />
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'button');
  button[0].props.onClick();
  expect(onClick).toBeCalled();
});

test('RoutedButton skips onClick if right clicked', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <RoutedButton label='Test' onClick={onClick} />
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'button');
  button[0].props.onClick({
    ctrlKey: true,
  });
  button[0].props.onClick({
    metaKey: true,
  });
  expect(onClick).not.toBeCalled();
});

test('RoutedButton calls router context push', () => {
  const preventDefault = jest.fn();
  const push = jest.fn();
  class FakeRouter extends Component {
    static childContextTypes = {
      router: PropTypes.object,
    }
    getChildContext() {
      return {
        router: {
          history: {
            push,
          },
        },
      };
    }
    render() {
      return <div>{this.props.children}</div>;
    }
  }
  const component = renderer.create(
    <Grommet>
      <FakeRouter>
        <RoutedButton label='Test' path='/' />
      </FakeRouter>
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'a');
  button[0].props.onClick({
    preventDefault,
  });
  expect(preventDefault).toBeCalled();
  expect(push).toBeCalledWith('/');
});

test('RoutedButton calls router context replace', () => {
  const preventDefault = jest.fn();
  const replace = jest.fn();
  class FakeRouter extends Component {
    static childContextTypes = {
      router: PropTypes.object,
    }
    getChildContext() {
      return {
        router: {
          replace,
        },
      };
    }
    render() {
      return <div>{this.props.children}</div>;
    }
  }
  const component = renderer.create(
    <Grommet>
      <FakeRouter>
        <RoutedButton label='Test' path='/' method='replace' />
      </FakeRouter>
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'a');
  button[0].props.onClick({
    preventDefault,
  });
  expect(preventDefault).toBeCalled();
  expect(replace).toBeCalledWith('/');
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

import { MnetUIBase, RoutedButton } from '../..';

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
  test('renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('RoutedButton is clickable', () => {
    const preventDefault = jest.fn();
    const onClick = jest.fn();
    const component = renderer.create(
      <MnetUIBase>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({ preventDefault });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();
  });

  test('RoutedButton skips onClick if right clicked', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <MnetUIBase>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" onClick={onClick} path="/" />
        </FakeRouter>
      </MnetUIBase>,
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
  });

  test('RoutedButton calls router context push', () => {
    const preventDefault = jest.fn();
    const component = renderer.create(
      <MnetUIBase>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" />
        </FakeRouter>
      </MnetUIBase>,
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
    const component = renderer.create(
      <MnetUIBase>
        <FakeRouter replace={replace} push={push}>
          <RoutedButton label="Test" path="/" method="replace" />
        </FakeRouter>
      </MnetUIBase>,
    );
    const tree = component.toJSON();

    const button = findAllByType(tree, 'a');
    button[0].props.onClick({
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(replace).toBeCalledWith('/');
  });
});

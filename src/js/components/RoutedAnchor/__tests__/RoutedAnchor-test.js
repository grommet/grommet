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
  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <FakeRouter>
          <RoutedAnchor label="Test" path="/" />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('is clickable', () => {
    const preventDefault = jest.fn();
    const push = jest.fn();
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push}>
          <RoutedAnchor label="Test" onClick={onClick} />
        </FakeRouter>
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({ preventDefault });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();
  });

  test('skips onClick if right clicked', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter>
          <RoutedAnchor label="Test" onClick={onClick} />
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
  });

  test('calls router context push', () => {
    const preventDefault = jest.fn();
    const push = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter push={push}>
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
  });

  test('calls router context replace', () => {
    const preventDefault = jest.fn();
    const replace = jest.fn();
    const component = renderer.create(
      <Grommet>
        <FakeRouter replace={replace}>
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
  });
});

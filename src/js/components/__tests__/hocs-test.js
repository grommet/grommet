import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import { findAllByType } from '../../utils';

import { withFocus } from '../hocs';

class TestDiv extends Component {
  render() {
    const { focus, ...rest } = this.props;
    return (
      <div {...rest}>
        { focus ? 'focus' : 'no focus' }
      </div>
    );
  }
}

const Test = withFocus(TestDiv);

test('withFocus set focus', () => {
  const component = renderer.create(<Test />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const container = findAllByType(tree, 'div');
  container[0].props.onFocus();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('withFocus skip focus when mouse active', () => {
  const component = renderer.create(<Test />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const container = findAllByType(tree, 'div');
  global.document.dispatchEvent(new Event('mousedown'));
  container[0].props.onFocus();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  global.document.dispatchEvent(new Event('mouseup'));
  container[0].props.onFocus();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  container[0].props.onBlur();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('withFocus calls callback', () => {
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const component = renderer.create(
    <Test
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
  const tree = component.toJSON();

  const container = findAllByType(tree, 'div');
  container[0].props.onFocus();
  container[0].props.onBlur();

  expect(onFocus).toBeCalled();
  expect(onBlur).toBeCalled();
});

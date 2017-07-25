import React from 'react';
import renderer from 'react-test-renderer';

import { findAllByType } from '../utils';
import { withFocus } from '../hocs';

const Test = withFocus(({ focus, ...rest }) => (
  <div {...rest}>
    { focus ? 'focus' : 'no focus' }
  </div>
));

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
  container[0].props.onMouseDown();
  container[0].props.onFocus();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  container[0].props.onMouseUp();
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
  const onMouseDown = jest.fn();
  const onMouseUp = jest.fn();
  const component = renderer.create(
    <Test
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
  const tree = component.toJSON();

  const container = findAllByType(tree, 'div');
  container[0].props.onFocus();
  container[0].props.onBlur();
  container[0].props.onMouseDown();
  container[0].props.onMouseUp();

  expect(onFocus).toBeCalled();
  expect(onBlur).toBeCalled();
  expect(onMouseDown).toBeCalled();
  expect(onMouseUp).toBeCalled();
});


import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Keyboard } from '../';

test('Keyboard renders', () => {
  const onDown = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Keyboard onDown={onDown}>
        <span>hi</span>
      </Keyboard>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[0].props.onKeyDown({
    keyCode: 40,
  });
  tree.children[0].props.onKeyDown({
    which: 40,
  });
  tree.children[0].props.onKeyDown({
    which: 0,
  });
  expect(onDown).toBeCalled();
});

test('Keyboard calls onKeyDown', () => {
  const onDown = jest.fn();
  const onKeyDown = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Keyboard onDown={onDown} onKeyDown={onKeyDown}>
        <span>hi</span>
      </Keyboard>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[0].props.onKeyDown({
    keyCode: 40,
  });
  expect(onDown).toBeCalled();
  expect(onKeyDown).toBeCalled();
});

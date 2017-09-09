import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { TextInput } from '../';

import { findAllByType } from '../../utils';

jest.mock('react-dom');

test('TextInput renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput id='item' name='item' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInput renders with suggestions', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={['test', 'test1']}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  input.props.onInput();
  expect(tree).toMatchSnapshot();
});

test('TextInput renders with complex suggestions', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={[
          { label: 'test', value: 'test' },
          { value: 'test1' },
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  input.props.onInput();
  expect(tree).toMatchSnapshot();
});

test('TextInput show suggestions on input change', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={['test', 'test1']}
      />
    </Grommet>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  const input = findAllByType(tree, 'input')[0];
  const fakeEvent = {};
  input.props.onInput(fakeEvent);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInput calls onDOMChange when onInput is called', () => {
  const onDOMChange = jest.fn();
  const component = renderer.create(
    <Grommet>
      <TextInput id='item' name='item' onDOMChange={onDOMChange} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  const input = findAllByType(tree, 'input')[0];
  const fakeEvent = {};
  input.props.onInput(fakeEvent);
  expect(onDOMChange).toBeCalledWith(fakeEvent);
});

test('TextInput closes suggestion drop', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={['test', { value: 'test1' }]}
      />
    </Grommet>
  );

  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  input.props.onKeyDown({
    keyCode: 9,
  });
  input.props.onKeyDown({
    keyCode: 27,
  });
});

test('TextInput handles next and previous suggestions', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={['test', { value: 'test1' }]}
      />
    </Grommet>
  );

  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  const preventDefault = jest.fn();
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 38,
    preventDefault,
  });
  expect(preventDefault).toBeCalled();
});

test('TextInput selects a suggestion', () => {
  const onSelect = jest.fn();
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
        suggestions={['test', { value: 'test1' }]}
        onSelect={onSelect}
      />
    </Grommet>
  );

  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  const preventDefault = jest.fn();
  // pressing enter here nothing will happen
  input.props.onKeyDown({
    keyCode: 13,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 13,
    preventDefault,
  });
  expect(preventDefault).toBeCalled();
  expect(onSelect).toBeCalled();
});

test('TextInput handles next and previous without suggestion', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput
        id='item'
        name='item'
      />
    </Grommet>
  );
  const tree = component.toJSON();
  const input = findAllByType(tree, 'input')[0];
  const preventDefault = jest.fn();
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 40,
    preventDefault,
  });
  input.props.onKeyDown({
    keyCode: 38,
    preventDefault,
  });
  expect(preventDefault).not.toBeCalled();
  expect(tree).toMatchSnapshot();
});

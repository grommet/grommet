import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Grommet from '../../grommet';
import Button from '../';

import { findAllByType } from '../../utils';

test('Button renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button primary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button primary={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button accent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button accent={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button secondary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button secondary={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button critical renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button critical={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button focus renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button focus={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button icon={<svg />} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button reverse icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button
        reverse={true}
        icon={<svg />}
        label='Test'
        onClick={() => {}}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button href renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button href='test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button box renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button box={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button box href renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button box={true} href='test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is clickable', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Button label='Test' onClick={onClick} />
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'button');
  button[0].props.onClick();
  expect(onClick).toBeCalled();
});

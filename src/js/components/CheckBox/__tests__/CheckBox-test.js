import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { CheckBox } from '../';

test('CheckBox renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox />
      <CheckBox id='test id' name='test name' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckBox label renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox label='test label' />
      <CheckBox label={<div>test label</div>} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckBox checked renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox checked={true} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckBox disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox disabled={true} />
      <CheckBox disabled={true} checked={true} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckBox reverse renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox reverse={true} label='test label' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckBox toggle renders', () => {
  const component = renderer.create(
    <Grommet>
      <CheckBox toggle={true} />
      <CheckBox toggle={true} checked={true} />
      <CheckBox toggle={true} label='test label' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

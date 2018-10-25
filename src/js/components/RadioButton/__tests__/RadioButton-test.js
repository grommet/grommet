import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { RadioButton } from '..';

test('RadioButton renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton />
      <RadioButton id="test id" name="test name" />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton label renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton label="test label" />
      <RadioButton label={<div>test label</div>} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton checked renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton checked />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton disabled />
      <RadioButton disabled checked />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

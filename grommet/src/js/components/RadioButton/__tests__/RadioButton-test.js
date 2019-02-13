import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { RadioButton } from '..';

test('RadioButton renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton name="test empty" />
      <RadioButton id="test id" name="test name" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton label renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton label="test label" name="test label" />
      <RadioButton label={<div>test label</div>} name="test div label" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton checked renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton checked name="test checked" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <RadioButton disabled name="test disabled" />
      <RadioButton disabled checked name="test checked disabled" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { FormField } from '..';
import { TextInput } from '../../TextInput';

const CustomFormField = styled(FormField)`
  font-size: 40px;
`;

test('renders', () => {
  const component = renderer.create(
    <Grommet>
      <FormField />
      <FormField>
        <TextInput />
      </FormField>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders label', () => {
  const component = renderer.create(
    <Grommet>
      <FormField label="test label" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders help', () => {
  const component = renderer.create(
    <Grommet>
      <FormField help="test help" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders error', () => {
  const component = renderer.create(
    <Grommet>
      <FormField error="test error" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders htmlFor', () => {
  const component = renderer.create(
    <Grommet>
      <FormField htmlFor="test-id" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders margin', () => {
  const component = renderer.create(
    <Grommet>
      <FormField margin="test-margin" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders custom formfield', () => {
  const component = renderer.create(
    <Grommet>
      <CustomFormField htmlFor="test-id" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

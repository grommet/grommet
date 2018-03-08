import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { FormField } from '../';
import { TextInput } from '../../TextInput';

test('renders', () => {
  const component = renderer.create(
    <Grommet>
      <FormField />
      <FormField><TextInput /></FormField>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders label', () => {
  const component = renderer.create(
    <Grommet>
      <FormField label='test label' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders help', () => {
  const component = renderer.create(
    <Grommet>
      <FormField help='test help' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders error', () => {
  const component = renderer.create(
    <Grommet>
      <FormField error='test error' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders border', () => {
  const component = renderer.create(
    <Grommet>
      {['inner', 'outer'].map(position =>
        ['all', 'bottom', 'left', 'vertical'].map(side =>
          ['xsmall', 'small', 'medium', 'large'].map(size => (
            <FormField border={{ position, side, size }} />
          ))
        )
      )}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

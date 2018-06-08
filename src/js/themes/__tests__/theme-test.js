import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../components/Grommet';
import { Box } from '../../components/Box';
import { Text } from '../../components/Text';
import dark from '../dark';
import hpe from '../hpe';

const colors = [
  'accent-1', 'accent-2', 'accent-3',
  'brand',
  'dark-1', 'dark-2', 'dark-3', 'dark-4', 'dark-5',
  'focus',
  'light-1', 'light-2', 'light-3', 'light-4', 'light-5',
  'neutral-1', 'neutral-2', 'neutral-3',
  'status-critical', 'status-disabled', 'status-ok', 'status-unknown', 'status-warning',
];

test('default renders', () => {
  const component = renderer.create(
    <Grommet>
      {colors.map(color => (
        <Box key={color} background={color}>
          <Text>test</Text>
        </Box>
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('dark renders', () => {
  const component = renderer.create(
    <Grommet theme={dark}>
      {colors.map(color => (
        <Box key={color} background={color}>
          <Text>test</Text>
        </Box>
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('hpe renders', () => {
  const component = renderer.create(
    <Grommet theme={hpe}>
      {colors.map(color => (
        <Box key={color} background={color}>
          <Text>test</Text>
        </Box>
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

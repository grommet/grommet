import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';

import { Grommet, Anchor, Box, Text, TextInput } from '../../components';
import { dark } from '..';

// accent colors should be deprecated. Used in tests for backward compatibility.
const accentColors = ['accent-1', 'accent-2', 'accent-3'];

const colors = [
  'brand',
  'dark-1',
  'dark-2',
  'dark-3',
  'dark-4',
  'dark-5',
  'dark-6',
  'focus',
  'light-1',
  'light-2',
  'light-3',
  'light-4',
  'light-5',
  'light-6',
  'neutral-1',
  'neutral-2',
  'neutral-3',
  'status-critical',
  'status-disabled',
  'status-ok',
  'status-unknown',
  'status-warning',
];

const customTheme = {
  global: {
    input: {
      // test backwards compatibility that string value works for input pad
      padding: '12px',
      font: {
        height: '50px',
        size: 'large',
        weight: 'bold',
      },
    },
    colors: {
      custom: '#cc6633',
      placeholder: 'custom',
    },
  },
};

describe('Grommet', () => {
  test('default theme', () => {
    const allColors = [...accentColors, ...colors];
    const component = renderer.create(
      <Grommet>
        {allColors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dark theme', () => {
    const allColors = [...accentColors, ...colors];
    const component = renderer.create(
      <Grommet theme={dark}>
        {allColors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const component = renderer.create(
      <Grommet theme={hpe}>
        {/* {console.log(colors)} */}
        {colors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('custom theme', () => {
    const component = renderer.create(
      <Grommet theme={customTheme}>
        <Box>
          <Anchor icon={<Add />} label="Add" />
          <Anchor icon={<Add />} label="Add" color="custom" />
        </Box>
        <Box background="dark-1">
          <Anchor icon={<Add />} label="Add" />
          <Anchor icon={<Add />} label="Add" color="custom" />
        </Box>
        <Box>
          <TextInput value="Value" placeholder="Placeholder" />
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from 'grommet-icons';
import { Box, Button, grommet, Grommet, Heading, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeNext } from 'grommet-theme-hpe-next';

const nextHpeNext = deepMerge(hpeNext, {
  global: {
    colors: {
      control: 'green',
    },
  },
  button: {
    default: {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
    },
    primary: {
      background: {
        color: 'green',
      },
      border: undefined,
      color: 'text-strong',
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
    },
    secondary: {
      border: {
        color: 'green',
        width: '2px',
      },
      color: 'text',
      padding: {
        horizontal: '10px',
        vertical: '4px',
      },
    },
    active: {
      background: {
        color: 'background-contrast',
      },
      color: 'text',
      secondary: {
        border: {
          color: 'transparent',
        },
      },
    },
    disabled: {
      background: {
        color: 'transparent',
      },
      color: 'text-weak',
      primary: {
        border: {
          color: 'text-weak',
          width: '2px',
        },
        padding: {
          horizontal: '10px',
          vertical: '4px',
        },
      },
      secondary: {
        border: {
          color: 'text-weak',
        },
      },
      opacity: 1.0,
    },
    hover: {
      default: {
        background: {
          color: 'background-contrast',
        },
        color: undefined,
      },
      secondary: {
        border: {
          width: '3px',
        },
        padding: {
          horizontal: '9px',
          vertical: '3px',
        },
      },
    },
  },
});

const themes = [
  { name: 'grommet', theme: grommet },
  { name: 'hpe', theme: hpe },
  { name: 'hpe next', theme: hpeNext },
  { name: 'next hpe next', theme: nextHpeNext },
];

const darks = [false, true];
const kinds = [
  { name: 'default', props: {} },
  { name: 'primary', props: { primary: true } },
  { name: 'secondary', props: { secondary: true } },
];
const states = [
  {},
  { active: true },
  { disabled: true },
  { color: 'teal' },
  { color: '#9999ff' },
  { color: '#333399' },
  { hoverIndicator: 'teal' },
];
const contents = [
  { icon: <User /> },
  { label: 'label' },
  { icon: <User />, label: 'label' },
  {
    plain: true,
    children: (
      <Box pad="xsmall">
        <Text color="orange">label</Text>
      </Box>
    ),
  },
];

const Example = () => (
  <Box pad="large" gap="large">
    {themes.map(({ name, theme }) => (
      <Grommet key={name} theme={theme}>
        <Box gap="medium">
          <Heading level={2} size="small" margin="none">
            {name}
          </Heading>
          {kinds
            .filter(kind => theme.button.default || kind.name !== 'secondary')
            .map(kind => (
              <Box key={kind.name} flex={false}>
                <Heading level={3} size="small">
                  {kind.name}
                </Heading>
                {states.map((state, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box key={index} direction="row" align="center">
                    {darks.map(dark => (
                      <Box
                        key={dark}
                        direction={dark ? 'row-reverse' : 'row'}
                        align="center"
                        gap="small"
                        background={{ color: 'background', dark }}
                        pad="small"
                      >
                        {contents.map((content, index2) => (
                          <Button
                            // eslint-disable-next-line react/no-array-index-key
                            key={index2}
                            {...kind.props}
                            {...content}
                            {...state}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      </Grommet>
    ))}
  </Box>
);

storiesOf('Button', module).add('Themes', () => <Example />);

import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from 'grommet-icons';
import { Box, Button, grommet, Grommet, Heading, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeNext } from 'grommet-theme-hpe-next';

const themes = [
  { name: 'grommet', theme: grommet },
  { name: 'hpe', theme: hpe },
  { name: 'hpe next', theme: hpeNext },
];

const darks = [false, true];
const kinds = [
  { name: 'default', props: {} },
  { name: 'primary', props: { primary: true } },
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
    children: (
      <Box pad="xsmall">
        <Text>label</Text>
      </Box>
    ),
  },
];

const Example = () => (
  <Box pad="large" gap="large">
    {themes.map(({ name, theme }) => (
      <Grommet theme={theme}>
        <Box gap="medium">
          <Heading level={2} size="small" margin="none">
            {name}
          </Heading>
          {kinds.map(kind => (
            <Box key={kind.name} flex={false}>
              <Heading level={3} size="small">
                {kind.name}
              </Heading>
              {states.map(state => (
                <Box direction="row" align="center">
                  {darks.map(dark => (
                    <Box
                      key={dark}
                      direction={dark ? 'row-reverse' : 'row'}
                      align="center"
                      gap="small"
                      background={{ color: 'background', dark }}
                      pad="small"
                    >
                      {contents.map((content, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
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

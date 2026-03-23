import React from 'react';

import { User } from 'grommet-icons';
import { Box, Button, Heading, Text } from 'grommet';
import { useThemeValue } from '../../../utils/useThemeValue';

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
        <Text>label</Text>
      </Box>
    ),
  },
];

export const Kind = () => {
  const { theme } = useThemeValue();
  return (
    <Box pad="large" gap="large">
      <Box gap="medium">
        {kinds.map((kind) => (
          <Box key={kind.name} flex={false}>
            <Heading level={3} size="small">
              {kind.name}
            </Heading>
            {states.map((state, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} direction="row" align="center">
                {darks.map((dark) => {
                  const backgroundFallback = dark ? 'black' : 'white';
                  return (
                    <Box
                      key={dark}
                      direction={dark ? 'row-reverse' : 'row'}
                      align="center"
                      gap="small"
                      background={{
                        color: theme.global.colors.background
                          ? 'background'
                          : backgroundFallback,
                        dark,
                      }}
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
                  );
                })}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default {
  title: 'Controls/Button/Kind',
};

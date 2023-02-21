import React from 'react';

import { Anchor, Box, Grommet, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { LinkNext } from 'grommet-icons';

const theme = deepMerge(hpe, {
  anchor: {
    color: 'text-strong',
    textDecoration: 'underline',
    fontWeight: 700,
    size: {
      large: {
        color: 'green!',
        textDecoration: 'none',
      },
      xlarge: {
        color: 'green!',
        textDecoration: 'none',
      },
      xxlarge: {
        color: 'green!',
        textDecoration: 'none',
      },
    },
  },
});

const SizeAnchor = () => (
  <Grommet theme={theme}>
    <Box align="center" pad="large">
      {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '10px'].map(
        (size) => (
          <Box key={size} margin="small">
            <Text size={size}>
              This anchor is <Anchor label={size} href="#" />
            </Text>
          </Box>
        ),
      )}
      {['medium', 'small'].map((size) => (
        <Box key={size} margin="small">
          <Anchor
            size={size}
            label={size || 'default'}
            icon={<LinkNext color="green!" size="18px" />}
            reverse
            href="#"
          />
        </Box>
      ))}

      <Anchor label="Default" />
    </Box>
  </Grommet>
);

export const Size = () => <SizeAnchor />;

export default {
  title: 'Controls/Anchor/Size',
};

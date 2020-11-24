import React from 'react';

import { Box, Grommet, Number } from 'grommet';

const customTheme = {
  global: {
    font: {
      family: 'Helvetica',
    },
  },
  number: {
    size: {
      small: 'xlarge',
      medium: '144px',
      large: '192px',
    },
    units: {
      size: {
        small: 'medium',
        medium: 'xxlarge',
        large: '96px',
      },
      weight: 'normal',
      color: 'text-weak',
    },
  },
};

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box align="center" justify="center" pad="large" gap="medium">
      {['small', 'medium', 'large'].map(size => (
        <Number value={27} units="GB" size={size} />
      ))}
    </Box>
  </Grommet>
);

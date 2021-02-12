import React from 'react';

import { Box, Grommet, Spinner, Stack } from 'grommet';

const theme = {
  global: {
    colors: {
      //   'brand-light': 'rgba(125, 76, 219, 0.3)',
      //   https://www.schemecolor.com/olympic-logos-and-symbols-colors.php#:~:text=The%20Olympic%20Logos%20And%20Symbols,and%20Cadmium%20Red%20(%23DF0024).
      blue: '#0085C7',
      'light-blue': 'rgba(0, 133, 199, 0.3)',
      yellow: '#F4C300',
      'light-yellow': 'rgba(244, 195, 0, 0.3)',
      pantone: '#009F3D',
      'light-pantone': 'rgba(0, 159, 61, 0.3)',
      red: '#DF0024',
      'light-red': 'rgba(223, 0, 36, 0.3)',
      'light-black': 'rgba(0, 0, 0, 0.3)',
    },
  },
};
const OlympicRing = ({ color }) => (
  <Spinner
    color="graph-1"
    size="large"
    border={[
      { side: 'all', color: `light-${color}`, size: 'medium' },
      { side: 'top', color, size: 'medium' },
    ]}
  />
);

export const Custom = () => (
  <Grommet theme={theme} full>
    <Box align="center">
      <Stack anchor="left">
        <Box align="start">
          <OlympicRing color="blue" />
        </Box>
        <Box margin={{ left: 'large' }}>
          <OlympicRing color="black" />
        </Box>
        <Box margin={{ left: 'xlarge' }}>
          <OlympicRing color="red" />
        </Box>
      </Stack>
      <Box justify="center">
        <Stack anchor="left">
          <Box margin={{ left: 'large' }} align="start">
            <OlympicRing color="yellow" />
          </Box>
          <Box margin={{ left: 'xlarge' }}>
            <OlympicRing color="pantone" />
          </Box>
        </Stack>
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Custom',
};

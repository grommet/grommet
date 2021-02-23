import React from 'react';

import { Box, Grommet, Spinner, Stack } from 'grommet';
import { ThemeType } from 'grommet/themes';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const theme: ThemeType = {
  global: {
    colors: {
      //   https://www.schemecolor.com/olympic-logos-and-symbols-colors.php#:~:text=The%20Olympic%20Logos%20And%20Symbols,and%20Cadmium%20Red%20(%23DF0024).
      blue: '#0085C7',
      'light-blue': 'rgba(0, 133, 199, 0.3)',
      yellow: '#F4C300',
      'light-yellow': 'rgba(244, 195, 0, 0.3)',
      green: '#009F3D',
      'light-green': 'rgba(0, 159, 61, 0.3)',
      red: '#DF0024',
      'light-red': 'rgba(223, 0, 36, 0.3)',
      'light-black': 'rgba(0, 0, 0, 0.3)',
    },
  },
  spinner: {
    container: {
      animation: { type: 'rotateLeft', duration: 900 },
    },
  },
};
const OlympicRing = ({ color }) => (
  <Spinner
    size="large"
    border={[
      { side: 'all', color: `light-${color}`, size: 'medium' },
      { side: 'top', color, size: 'medium' },
    ]}
  />
);

export const Themed = () => (
  <Grommet theme={theme} full>
    <Box align="center" pad="large" responsive={false}>
      <Stack anchor="left">
        <Box align="start" responsive={false}>
          <OlympicRing color="blue" />
        </Box>
        <Box margin={{ left: 'large' }} responsive={false}>
          <OlympicRing color="black" />
        </Box>
        <Box margin={{ left: 'xlarge' }} responsive={false}>
          <OlympicRing color="red" />
        </Box>
      </Stack>
      <Box justify="center" margin="-20px">
        <Stack anchor="left">
          <Box margin={{ left: 'large' }} align="start" responsive={false}>
            <OlympicRing color="yellow" />
          </Box>
          <Box margin={{ left: 'xlarge' }} responsive={false}>
            <OlympicRing color="green" />
          </Box>
        </Stack>
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Spinner/Themed',
};

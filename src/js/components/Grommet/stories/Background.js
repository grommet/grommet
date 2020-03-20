import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Box, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const Background = () => {
  const themeColor = 'background-back';
  const hexValue = '#DCD0FF';
  const cssColor = 'gold';
  return (
    <Box gap="medium">
      <Grommet>
        <Box pad="medium">
          <Text>Grommet with no theme or background prop</Text>
        </Box>
      </Grommet>
      <Grommet theme={hpe} themeMode="dark">
        <Box pad="medium">
          <Text>Grommet with theme & themeMode but no background prop</Text>
        </Box>
      </Grommet>
      <Grommet theme={hpe} themeMode="light" background={themeColor}>
        <Box pad="medium">
          <Text>
            Grommet with background as theme color of &apos;{themeColor}&apos;
          </Text>
        </Box>
      </Grommet>
      <Grommet theme={grommet} background={hexValue}>
        <Box pad="medium">
          <Text>
            Grommet with background as HEX value of &apos;{hexValue}&apos;
          </Text>
        </Box>
      </Grommet>
      <Grommet theme={grommet} background={cssColor}>
        <Box pad="medium">
          <Text>
            Grommet with background as CSS color name of &apos;{cssColor}&apos;
          </Text>
        </Box>
      </Grommet>
      <Grommet
        theme={grommet}
        background={{
          color: 'pink',
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        <Box pad="medium">
          <Text>
            Grommet with background as object containing color and image
          </Text>
        </Box>
      </Grommet>
    </Box>
  );
};

storiesOf('Grommet', module).add('Background', () => <Background />);

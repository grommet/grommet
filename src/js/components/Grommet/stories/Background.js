import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const Background = () => {
  const themeColor = 'background-back';
  const hexValue = '#DCD0FF';
  const cssColor = 'gold';
  return (
    <Box gap="medium">
      <Grommet>
        <Box pad="medium">
          <p>Grommet with no theme or background prop</p>
        </Box>
      </Grommet>
      <Grommet theme={hpe} themeMode="dark">
        <Box pad="medium">
          <p>Grommet with theme & themeMode but no background prop</p>
        </Box>
      </Grommet>
      <Grommet theme={hpe} themeMode="light" background={themeColor}>
        <Box pad="medium">
          <p>
            Grommet with background as theme color of &apos;{themeColor}&apos;
          </p>
        </Box>
      </Grommet>
      <Grommet theme={grommet} background={hexValue}>
        <Box pad="medium">
          <p>Grommet with background as HEX value of &apos;{hexValue}&apos;</p>
        </Box>
      </Grommet>
      <Grommet theme={grommet} background={cssColor}>
        <Box pad="medium">
          <p>
            Grommet with background as CSS color name of &apos;{cssColor}&apos;
          </p>
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
          <p>Grommet with background as object containing color and image</p>
        </Box>
      </Grommet>
    </Box>
  );
};

storiesOf('Grommet', module).add('Background', () => <Background />);

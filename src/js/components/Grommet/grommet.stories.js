import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Anchor, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};

const Themed = () => (
  <Grommet theme={customTheme}>
    <Box pad="medium">
      <Anchor icon={<Add />} label="Add" color="custom" />
    </Box>
  </Grommet>
);

const Plain = () => (
  <>
    <Grommet plain>
      <Box pad="medium">
        <p>Plain Grommet</p>
      </Box>
    </Grommet>
    <Grommet>
      <Box pad="medium">
        <p>Not plain Grommet</p>
      </Box>
    </Grommet>
  </>
);

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

const GrommetVars = () => (
  <Grommet theme={grommet} cssVars>
    <Box pad="medium" background="var(--accent-2)" gap="medium">
      <Box>
        Checkout Grommet variables, you can find them in the StyledGrommet DOM.
      </Box>
      <Box with>
        For example, the background color in this Box is using var(--accent-2)
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Grommet', module)
  .add('Plain', () => <Plain />)
  .add('Theme', () => <Themed />)
  .add('Vars', () => <GrommetVars />)
  .add('Background', () => <Background />);

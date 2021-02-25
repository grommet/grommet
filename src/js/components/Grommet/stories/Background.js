import React from 'react';
import { storiesOf } from '@storybook/react';

import { mnet, MnetUIBase, Box, Text } from 'mnet-ui-base';
// import { neo } from 'mnet-ui-base-theme-neo';
// import { cdp } from 'mnet-ui-base-theme-cdp';

const Background = () => {
  // const themeColor = 'background-back';
  const hexValue = '#DCD0FF';
  const cssColor = 'gold';
  return (
    <Box gap="medium">
      <MnetUIBase>
        <Box pad="medium">
          <Text>MnetUIBase with no theme or background prop</Text>
        </Box>
      </MnetUIBase>
      {/* <MnetUIBase theme={neo} themeMode="dark">
        <Box pad="medium">
          <Text>MnetUIBase with theme & themeMode but no background prop</Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase theme={neo} themeMode="light" background={themeColor}>
        <Box pad="medium">
          <Text>
            MnetUIBase with background as theme color of &apos;{themeColor}
            &apos;
          </Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase theme={cdp} themeMode="dark">
        <Box pad="medium">
          <Text>MnetUIBase with theme & themeMode but no background prop</Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase theme={cdp} themeMode="light" background={themeColor}>
        <Box pad="medium">
          <Text>
            MnetUIBase with background as theme color of &apos;{themeColor}
            &apos;
          </Text>
        </Box>
      </MnetUIBase> */}
      <MnetUIBase theme={mnet} background={hexValue}>
        <Box pad="medium">
          <Text>
            MnetUIBase with background as HEX value of &apos;{hexValue}&apos;
          </Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase theme={mnet} background={cssColor}>
        <Box pad="medium">
          <Text>
            MnetUIBase with background as CSS color name of &apos;{cssColor}
            &apos;
          </Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase
        theme={mnet}
        background={{
          color: 'pink',
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        <Box pad="medium">
          <Text>
            MnetUIBase with background as object containing color and image
          </Text>
        </Box>
      </MnetUIBase>
    </Box>
  );
};

storiesOf('MnetUIBase', module).add('Background', () => <Background />);

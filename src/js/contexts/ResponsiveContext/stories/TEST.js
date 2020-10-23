import React from 'react';
import { storiesOf } from '@storybook/react';

// import { deepMerge } from 'grommet/utils';
// import { grommet } from 'grommet/themes';

// import { render } from "react-dom";
import { Grommet, ThemeContext, Box, Text } from 'grommet';

// import { Box, Grid, Paragraph, Grommet, ResponsiveContext } from 'grommet';

// const customBreakpoints = deepMerge(grommet, {
//   global: {
//     breakpoints: {
//       xsmall: {
//         value: 500,
//       },
//       small: {
//         value: 900,
//       },
//       medium: undefined,
//       middle: {
//         value: 3000,
//       },
//     },
//   },
// });

const ResponsiveGridExample = () => (
  <Grommet>
    <ThemeContext.Extend value={{ box: { responsiveBreakpoint: 'medium' } }}>
      <Box flex direction="row-responsive" gap="small" overflow="auto">
        <Text>hello</Text>
        <Text>word</Text>
      </Box>
    </ThemeContext.Extend>
  </Grommet>
);

storiesOf('ResponsiveContext', module).add('TEST', () => (
  <ResponsiveGridExample />
));

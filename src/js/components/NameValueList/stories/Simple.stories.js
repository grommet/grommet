import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { data } from './data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Simple',
};

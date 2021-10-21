import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box pad="large">
      <Text weight="bold" size="3xl">
        Default NameValueList
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value}
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Simple',
};

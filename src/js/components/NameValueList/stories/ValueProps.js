import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const ValueProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Text weight="bold" size="3xl">
        align: end
      </Text>
      <NameValueList valueProps={{ align: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        width: large
      </Text>
      <NameValueList valueProps={{ width: 'large' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Value Props',
};

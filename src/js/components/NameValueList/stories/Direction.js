import React from 'react';
import { Box, Grommet, Text, NameValueList, NameValuePair } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Direction = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        List: Row / Property: Column
      </Text>
      <NameValueList direction={{ list: 'row', property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        List: Column / Property: Column
      </Text>
      <NameValueList direction={{ property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Direction',
};

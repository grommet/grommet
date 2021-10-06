import React from 'react';
import {
  Box,
  Grommet,
  grommet,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { data } from './data';

export const Align = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Align Value: end
      </Text>
      <NameValueList align={{ value: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        Align Name: end
      </Text>
      <NameValueList align={{ name: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Align',
};

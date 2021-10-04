import React from 'react';
import { Box, Grommet, grommet, Property, PropertyList, Text } from 'grommet';
import { data } from './data';

export const Align = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Align Value: end
      </Text>
      <PropertyList align={{ value: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
      <Text weight="bold" size="3xl">
        Align Name: end
      </Text>
      <PropertyList align={{ name: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Align',
};

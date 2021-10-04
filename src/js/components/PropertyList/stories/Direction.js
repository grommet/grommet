import React from 'react';
import { Box, Grommet, Text, Property, PropertyList } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Direction = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        List: Row / Property: Column
      </Text>
      <PropertyList direction={{ list: 'row', property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
      <Text weight="bold" size="3xl">
        List: Column / Property: Column
      </Text>
      <PropertyList direction={{ property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Direction',
};

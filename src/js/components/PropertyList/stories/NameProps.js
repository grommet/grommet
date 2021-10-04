import React from 'react';
import { Box, Grommet, Property, PropertyList } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const NameProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <PropertyList direction={{ property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property
            key={name}
            name={name}
            nameProps={{ size: 'xsmall', weight: 500 }}
            value={value}
          />
        ))}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Name Props',
};

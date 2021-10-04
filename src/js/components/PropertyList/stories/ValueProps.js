import React from 'react';
import { Box, Grommet, Property, PropertyList } from 'grommet';
import { grommet } from 'grommet/themes';
import { metricData } from './data';

export const ValueProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <PropertyList
        columns="small"
        direction={{ list: 'row', property: 'column-reverse' }}
      >
        {Object.entries(metricData).map(([name, value]) => (
          <Property
            key={name}
            name={name}
            justify="end"
            valueProps={{ size: '3xl' }}
            value={value}
          />
        ))}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Value Props',
};

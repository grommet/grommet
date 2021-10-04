import React from 'react';
import { Box, Grommet, grommet, Property, PropertyList } from 'grommet';
import { deepMerge } from 'grommet/utils';

const data = {
  'Model type': 'MXQ83700F3',
  'Last synced on some date': '34343738-3036-584DFD3422SA',
  'Created on': '172.16.255.321.8',
  Policies: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget 
  est at turpis imperdiet blandit porttitor eu enim. Phasellus faucibus 
  pharetra risus nec bibendum.`,
};

const customTheme = deepMerge(grommet, {
  property: {
    name: {
      color: 'text',
      size: 'xsmall',
      weight: 500,
    },
    value: {
      color: 'text',
    },
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box pad="small">
      <PropertyList direction={{ property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Custom',
};

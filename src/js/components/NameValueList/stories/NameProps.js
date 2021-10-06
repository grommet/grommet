import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const NameProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <NameValueList direction={{ property: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair
            key={name}
            name={name}
            nameProps={{ size: 'xsmall', weight: 500 }}
            value={value}
          />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Name Props',
};

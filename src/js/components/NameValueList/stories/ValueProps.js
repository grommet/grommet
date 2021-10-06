import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair } from 'grommet';
import { grommet } from 'grommet/themes';
import { metricData } from './data';

export const ValueProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <NameValueList
        columns="small"
        direction={{ list: 'row', property: 'column-reverse' }}
      >
        {Object.entries(metricData).map(([name, value]) => (
          <NameValuePair
            key={name}
            name={name}
            justify="end"
            valueProps={{ size: '3xl' }}
            value={value}
          />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Value Props',
};

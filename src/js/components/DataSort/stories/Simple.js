import React from 'react';
import { Box, Data, DataSort, DataTable } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

const properties = {};
columns.forEach(({ property, header }) => {
  properties[property] = {
    label: typeof header === 'string' ? header : property,
  };
});

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA} properties={properties}>
      <DataSort />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataSort/Simple',
};

import React from 'react';
import {
  Box,
  Data,
  DataSummary,
  DataTable,
  DataSearch,
  Paragraph,
  Toolbar,
} from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

export const UpdateOnSubmit = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Paragraph color="text-weak">
      Note: Results are filtered once you hit enter.
    </Paragraph>
    <Data data={DATA}>
      <Toolbar>
        <DataSearch updateOn="submit" />
      </Toolbar>
      <DataSummary />
      <DataTable alignSelf="start" columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

UpdateOnSubmit.args = {
  full: true,
};

UpdateOnSubmit.parameters = {
  chromatic: { disable: true },
};

UpdateOnSubmit.storyName = 'Update on submit';

export default {
  title: 'Data/DataSearch/Update on submit',
};

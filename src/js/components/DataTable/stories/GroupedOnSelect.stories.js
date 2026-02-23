import React from 'react';

import { Box, DataTable } from 'grommet';
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

const expandLabel = (row) => `${row?.location} location`;

export const GroupedOnSelectDataTable = () => {
  const [selected, setSelected] = React.useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable
        columns={groupColumns}
        data={DATA}
        selected={selected}
        onSelect={setSelected}
        rowProps={
          selected.length
            ? Object.fromEntries(
                selected.map((key) => [
                  key,
                  { background: 'blue', selected: { background: 'blue' } },
                ]),
              )
            : {}
        }
        sortable
      />
    </Box>
    // </Grommet>
  );
};

GroupedOnSelectDataTable.storyName = 'Grouped and onSelect';

export default {
  title: 'Visualizations/DataTable/Grouped and onSelect',
};

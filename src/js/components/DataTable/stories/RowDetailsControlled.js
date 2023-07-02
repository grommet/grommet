import React from 'react';

import { Box, DataTable, CheckBox } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const controlledColumns = columns.map((col) => ({ ...col }));
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

export const ControlledDataTable = () => {
  const [single, setSingle] = React.useState(true);
  const [openRows, setOpenRows] = React.useState([]);

  const toggleRow = (rowId) => {
    if (single !== true) {
      const newOpenRows = openRows.slice();
      const itemIndex = newOpenRows.indexOf(rowId);
      if (itemIndex >= 0) {
        newOpenRows.splice(itemIndex, 1);
      } else {
        newOpenRows.push(rowId);
      }
      setOpenRows(newOpenRows);
    } else {
      let newOpenRows = [];
      if (openRows.length === 0 || openRows[0] !== rowId) {
        newOpenRows = [rowId];
      }
      setOpenRows(newOpenRows);
    }
  };

  const toggleSingle = () => {
    const toggledSingle = !single;
    if (toggledSingle === true && openRows.length > 1) {
      setOpenRows(openRows.slice(0, 1));
    }
    setSingle(toggledSingle);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box pad="medium" gap="medium">
      <CheckBox
        label="Multi select"
        checked={!single}
        onChange={toggleSingle}
      />
      <DataTable
        columns={controlledColumns.map((col) => ({ ...col }))}
        data={DATA}
        sortable
        rowDetails={{
          render: (row) => <Box>Blahhhh {row.name} </Box>,
          expanded: (row) => openRows.includes(row.name),
          expandable: (row) => row.name !== 'Bryan',
          onClickExpand: (row) => toggleRow(row.name),
        }}
        size="medium"
      />
    </Box>
    // </Grommet>
  );
};

ControlledDataTable.storyName = 'RowDetails Controlled';

export default {
  title: 'Visualizations/DataTable/RowDetails Controlled',
};

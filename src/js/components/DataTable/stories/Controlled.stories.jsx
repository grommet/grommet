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
  const [checked, setChecked] = React.useState([]);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };

  const onCheckAll = (event) =>
    setChecked(event.target.checked ? DATA.map((datum) => datum.name) : []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <DataTable
        columns={[
          {
            property: 'checkbox',
            render: ({ name }) => (
              <CheckBox
                key={name}
                checked={checked.indexOf(name) !== -1}
                onChange={(e) => onCheck(e, name)}
                aria-label="row checkbox"
              />
            ),
            header: (
              <CheckBox
                checked={checked.length === DATA.length}
                indeterminate={
                  checked.length > 0 && checked.length < DATA.length
                }
                onChange={onCheckAll}
                aria-label="header checkbox"
              />
            ),
            sortable: false,
          },
          ...controlledColumns,
        ].map((col) => ({ ...col }))}
        data={DATA}
        sortable
        size="medium"
      />
    </Box>
    // </Grommet>
  );
};

ControlledDataTable.storyName = 'Controlled';

export default {
  title: 'Visualizations/DataTable/Controlled',
};

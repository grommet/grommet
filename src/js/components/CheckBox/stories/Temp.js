import React, { useState } from 'react';

import { Box, Grommet, CheckBox, FormField, DataTable } from 'grommet';
// import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from '../../DataTable/stories/data';

const controlledColumns = columns.map(col => ({ ...col }));
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

const myTheme = deepMerge(hpe, {
  checkBox: {
    check: {
      extend: props => {
        return `
          ${
            props.componentContext === 'FormField'
              ? `box-shadow: none`
              : `box-shadow: undefined`
          };
        `;
      },
    },
  },
});

export const Temp = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked, setChecked] = React.useState([]);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };

  const onCheckAll = event =>
    setChecked(event.target.checked ? DATA.map(datum => datum.name) : []);

  return (
    <Grommet theme={myTheme}>
      <Box align="start" pad="large" gap="large">
        <CheckBox
          checked={checked1}
          onChange={event => setChecked1(event.target.checked)}
          label="I agree"
        />
        <FormField>
          <CheckBox
            checked={checked2}
            onChange={event => setChecked2(event.target.checked)}
            label="I understand and approve"
          />
        </FormField>
        <DataTable
          columns={[
            {
              property: 'checkbox',
              render: datum => (
                <CheckBox
                  key={datum.name}
                  checked={checked.indexOf(datum.name) !== -1}
                  onChange={e => onCheck(e, datum.name)}
                />
              ),
              header: (
                <CheckBox
                  checked={checked.length === DATA.length}
                  indeterminate={
                    checked.length > 0 && checked.length < DATA.length
                  }
                  onChange={onCheckAll}
                />
              ),
              sortable: false,
            },
            ...controlledColumns,
          ].map(col => ({ ...col }))}
          data={DATA}
          sortable
          size="medium"
        />
      </Box>
    </Grommet>
  );
};

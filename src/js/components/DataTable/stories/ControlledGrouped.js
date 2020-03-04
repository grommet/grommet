import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, DataTable, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

const ControlledGroupedDataTable = () => {
  const [expandedGroups, setExpandedGroups] = useState([DATA[2].location]);

  return (
    <Grommet theme={grommet}>
      <DataTable
        columns={groupColumns}
        data={DATA}
        groupBy={{
          property: 'location',
          expand: expandedGroups,
          onExpand: setExpandedGroups,
        }}
        sortable
      />
      <Anchor
        margin={{ top: 'medium' }}
        alignSelf="center"
        href="https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js"
        label="Data used for storybook example"
      />
    </Grommet>
  );
};

storiesOf('DataTable', module).add('Controlled grouped', () => (
  <ControlledGroupedDataTable />
));

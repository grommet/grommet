import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { DataTable } from 'mnet-ui-base';

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
    <>
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
    </>
  );
};

storiesOf('DataTable', module).add('Controlled grouped', () => (
  <ControlledGroupedDataTable />
));

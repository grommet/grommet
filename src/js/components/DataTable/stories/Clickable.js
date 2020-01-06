import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, DATA } from './data';

const ClickableDataTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      {/* eslint-disable no-alert */}
      <DataTable
        columns={columns}
        data={DATA}
        step={10}
        onClickRow={event => alert(JSON.stringify(event.datum, null, 2))}
      />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Clickable', () => <ClickableDataTable />);

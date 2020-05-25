import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, DataTable } from 'mnet-ui-base';

import { columns, DATA } from '../data';

const ClickableDataTable = () => (
  <>
    <Box align="center" pad="large">
      {/* eslint-disable no-alert */}
      <DataTable
        columns={columns}
        data={DATA}
        step={10}
        onClickRow={event => console.log(event.datum)}
      />
    </Box>
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/DataTable', module).add('Clickable', () => (
    <ClickableDataTable />
  ));
}

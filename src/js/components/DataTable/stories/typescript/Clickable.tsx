import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from '../data';

const ClickableDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      {/* eslint-disable no-alert */}
      <DataTable
        columns={columns}
        data={DATA}
        step={10}
        onClickRow={event => console.log(event.datum)}
      />
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/DataTable', module).add('Clickable', () => (
    <ClickableDataTable />
  ));
}

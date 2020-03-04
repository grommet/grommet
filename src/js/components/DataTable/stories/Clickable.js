import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const ClickableDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      {/* eslint-disable no-alert */}
      <DataTable
        columns={columns}
        data={DATA}
        step={10}
        onClickRow={event => alert(JSON.stringify(event.datum, null, 2))}
      />
      <Anchor
        margin={{ top: 'medium' }}
        alignSelf="center"
        href="https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js"
        label="Data used for storybook example"
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Clickable', () => <ClickableDataTable />);

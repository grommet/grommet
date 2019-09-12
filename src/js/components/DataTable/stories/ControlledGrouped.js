import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

class ControlledGroupedDataTable extends Component {
  state = { expandedGroups: [DATA[2].location] };

  render() {
    const { expandedGroups } = this.state;
    return (
      <Grommet theme={grommet}>
        <DataTable
          columns={groupColumns}
          data={DATA}
          groupBy={{
            property: 'location',
            expand: expandedGroups,
            onExpand: groupState =>
              this.setState({ expandedGroups: groupState }),
          }}
          sortable
        />
      </Grommet>
    );
  }
}

storiesOf('DataTable', module).add('Controlled grouped', () => (
  <ControlledGroupedDataTable />
));

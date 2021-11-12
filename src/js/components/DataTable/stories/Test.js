import { Grommet, Box, DataTable } from 'grommet';
import React from 'react';

const theme = {
  dataTable: {
    pinned: {
      header: {
        background: {
          color: 'blue',
        },
      },
      footer: {
        background: {
          color: 'green',
        },
      },
    },
  },
};

export const Test = () => (
  <Grommet theme={theme}>
    {[true, 'header', 'footer'].map((pin) => (
      <DataTable
        // background={{ pinned: 'red' }}
        key={JSON.stringify(pin)}
        columns={[
          { property: 'a', header: 'A', footer: 'Total', pin: true },
          { property: 'b', header: 'B' },
        ]}
        data={[
          { a: 'one', b: 1 },
          { a: 'two', b: 2 },
        ]}
        pin={pin}
      />
    ))}
  </Grommet>
);

Test.storyName = 'Test and pin';

export default {
  title: 'Visualizations/DataTable/Test and pin',
};

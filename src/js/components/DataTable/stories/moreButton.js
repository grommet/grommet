import React, { useState } from 'react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const newData = DATA;

export const MoreButtonDataTable = () => {
  const [tableData, setNewData] = useState(DATA);
  const load = () => {
    setTimeout(() => {
      setNewData([...tableData, ...newData]);
    }, 2000);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable
          columns={columns}
          data={tableData}
          step={10}
          onMore={() => load()}
          moreButton
        />
      </Box>
    </Grommet>
  );
};

MoreButtonDataTable.storyName = 'More Button';

export default {
  title: 'Visualizations/DataTable/More Button',
};

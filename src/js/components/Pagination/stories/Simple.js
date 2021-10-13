import React, { useState } from 'react';

import { Box, Button, DataTable, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const defaultData = [
  {
    id: 'OID257383',
    orderName: 'My Test Order',
    state: 'Created',
  },
];

const columns = [
  {
    property: 'orderName',
    header: 'Name',
    render: (datum) => <Text>{datum.orderName}</Text>,
    size: 'small',
    search: true,
  },
  {
    property: 'state',
    header: 'State',
    render: (datum) => <Text>{datum.state}</Text>,
    size: 'xsmall',
  },
];

export const Simple = () => {
  const [data, setData] = useState(defaultData);

  const removeData = () => {
    const newArray = [...data];
    newArray.pop();
    setData(newArray);
  };
  const addData = () => {
    const newArray = [...data];
    newArray.push({
      id: Math.floor(Math.random() * 10000),
      orderName: `NEW_${Math.floor(Math.random() * 10)}`,
      state: `State_${Math.floor(Math.random() * 10)}`,
    });
    setData(newArray);
  };

  return (
    <Grommet theme={grommet}>
      <Box gap="small">
        <DataTable columns={columns} data={data} paginate step={1} />
      </Box>
      <Box width="medium">
        <Button onClick={addData} label="Add row" />
        <br />
        <Button onClick={removeData} label="Remove last item" />
      </Box>
    </Grommet>
  );
};
export default {
  title: 'Controls/Pagination/Simple',
};

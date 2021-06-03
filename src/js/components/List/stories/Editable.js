import React, { useState } from 'react';

import { Box, Grommet, grommet, List, Text, TextInput } from 'grommet';

const initialData = ['Boise', 'Fort Collins', 'Bay Area', 'San Diego'];

export const Editable = () => {
  const [data, setData] = useState(initialData);
  return (
    <Grommet theme={grommet}>
      <Box pad="large" fill="vertical" align="center">
        <List data={data} pad="small" border={false}>
          {(datum, i) => (
            <Box direction="row" gap="medium" align="center">
              <Text>{i}</Text>
              <TextInput
                value={datum}
                onChange={event => {
                  const nextData = JSON.parse(JSON.stringify(data));
                  nextData[i] = event.target.value;
                  setData(nextData);
                }}
              />
            </Box>
          )}
        </List>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/List/Editable',
};

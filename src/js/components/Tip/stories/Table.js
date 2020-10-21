import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Anchor,
  Box,
  DataTable,
  Grommet,
  Heading,
  Text,
  Tip,
} from 'grommet';
import { Trash, Refresh, Info } from 'grommet-icons';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from '../../DataTable/stories/data';

const TipContent = ({ message, icon }) => (
  <Box
    background="dark-3"
    round="xsmall"
    pad="xsmall"
    margin="xsmall"
    direction="row"
    gap="small"
  >
    {icon && <Info color="accent-4" />}
    <Text color="accent-1">{message}</Text>
  </Box>
);

const Example = () => {
  const [data, setData] = useState(DATA);
  const [selected, setSelected] = useState();

  const removeRow = () => {
    const filteredData = data.filter(item => item.name !== selected.name);
    setData(filteredData);
    setSelected(undefined);
  };

  return (
    <Grommet full theme={grommet}>
      <Box align="center" justify="center" background="dark-1" fill gap="large">
        <Heading textAlign="center" level="1" size="xsmall">
          Follow the Tips of the Trash & Reload icons for directions
        </Heading>
        <Box>
          <Box fill direction="row" justify="between">
            <Tip
              content={
                <TipContent
                  message={
                    !selected ? 'Select a table row' : 'Delete table Row'
                  }
                  icon={!selected}
                />
              }
            >
              <Anchor
                disabled={!selected}
                icon={<Trash />}
                onClick={removeRow}
              />
            </Tip>
            <Tip
              dropProps={{ align: { right: 'left' } }}
              content={
                <TipContent
                  message={
                    data.length < DATA.length
                      ? 'Reload Data'
                      : 'Delete items before reload action is available'
                  }
                  icon={!selected}
                />
              }
            >
              <Anchor
                icon={<Refresh />}
                onClick={() => setData(DATA)}
                disabled={data.length === DATA.length}
              />
            </Tip>
          </Box>
          <DataTable
            columns={columns}
            data={data}
            step={10}
            onClickRow={event => setSelected(event.datum)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Table Header', () => <Example />, {
  chromatic: { disable: true },
});

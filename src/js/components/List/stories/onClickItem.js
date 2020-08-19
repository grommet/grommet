import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
    location: locations[i % locations.length],
    date: `2018-07-${(i % 30) + 1}`,
    percent: (i % 11) * 10,
    paid: ((i + 1) * 17) % 1000,
  });
}

const OnClickItemList = () => {
  const [clicked, setClicked] = React.useState();
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <List
          data={data.slice(0, 10)}
          onClickItem={event => setClicked(event.item)}
        />

        {clicked && JSON.stringify(clicked, null, 2)}
      </Box>
    </Grommet>
  );
};

storiesOf('List', module).add('onClickItem', () => <OnClickItemList />);

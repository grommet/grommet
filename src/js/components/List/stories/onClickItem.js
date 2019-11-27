import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

import { data } from './data';

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

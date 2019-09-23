import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

import { DATA } from './data';

const ClickableList = () => {
  const [clicked, setClicked] = React.useState();
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <List data={DATA} onClickItem={event => setClicked(event.item)} />

        {clicked && JSON.stringify(clicked, null, 2)}
      </Box>
    </Grommet>
  );
};

storiesOf('List', module).add('Clickable', () => <ClickableList />);

import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, List } from 'mnet-ui-base';

import { data } from './data';

const SelectionList = () => {
  const [selected, setSelected] = React.useState();

  return (
    <>
      <Box align="center" pad="large" gap="large">
        <List
          data={data.slice(0, 10)}
          itemProps={
            selected >= 0 ? { [selected]: { background: 'brand' } } : undefined
          }
          onClickItem={event =>
            setSelected(selected === event.index ? undefined : event.index)
          }
        />
      </Box>
    </>
  );
};

storiesOf('List', module).add('selection', () => <SelectionList />);

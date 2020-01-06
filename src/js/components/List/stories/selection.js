import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, List } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { data } from './data';

const SelectionList = () => {
  const [selected, setSelected] = React.useState();

  return (
    <MnetUIBase theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('List', module).add('selection', () => <SelectionList />);

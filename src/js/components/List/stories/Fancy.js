import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { data } from './data';

const FancyList = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <List
          data={data.slice(0, 10)}
          primaryKey={item => (
            <Text size="large" weight="bold">
              {item.entry}
            </Text>
          )}
          secondaryKey="location"
          itemProps={
            selected >= 0 ? { [selected]: { background: 'brand' } } : undefined
          }
          onClickItem={event =>
            setSelected(selected === event.index ? undefined : event.index)
          }
        />
      </Box>
    </Grommet>
  );
};

storiesOf('List', module).add('Fancy', () => <FancyList />);

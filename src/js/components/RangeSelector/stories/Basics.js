import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleRangeSelector = ({ direction = 'horizontal', ...rest }) => {
  const [range, setRange] = useState([12, 16]);
  const onChange = values => {
    setRange(values);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Stack>
          <Box
            direction={direction === 'vertical' ? 'column' : 'row'}
            justify="between"
          >
            {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(value => (
              <Box
                key={value}
                width="xxsmall"
                height="xxsmall"
                align="center"
                pad="small"
                border={false}
              >
                <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
              </Box>
            ))}
          </Box>
          <RangeSelector
            direction={direction}
            min={10}
            max={20}
            size="full"
            values={range}
            onChange={onChange}
            {...rest}
          />
        </Stack>
      </Box>
    </Grommet>
  );
};

storiesOf('RangeSelector', module)
  .add('Simple', () => <SimpleRangeSelector />)
  .add('Step', () => <SimpleRangeSelector step={2} />)
  .add('Vertical', () => <SimpleRangeSelector direction="vertical" />);

import React, { useState } from 'react';
import { Gremlin, Grommet as GrommetIcon } from 'grommet-icons';
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customEdge = deepMerge(grommet, {
  rangeSelector: {
    edge: {
      type: <Gremlin size="large" color="neutral-2" />,
      // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,
    },
  },
});

export const CustomEdgeControl = ({ direction = 'horizontal', ...rest }) => {
  const [range, setRange] = useState([2, 7]);
  const onChange = (values) => {
    setRange(values);
  };

  return (
    <Grommet theme={customEdge}>
      <Box align="center" pad="xlarge" gap="large">
        <Text style={{ fontFamily: 'Comic Sans MS' }} color="brand">
          Feed the gremlins with grommets...{' '}
        </Text>
        <Stack>
          <Box direction="row" justify="between">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <Box
                key={value}
                width="xsmall"
                height="xsmall"
                justify="center"
                align="center"
                pad="small"
                border={false}
              >
                <GrommetIcon color="brand" size="small" />
              </Box>
            ))}
          </Box>
          <RangeSelector
            direction={direction}
            min={0}
            max={9}
            size="full"
            values={range}
            color="accent-3"
            onChange={onChange}
            {...rest}
          />
        </Stack>
      </Box>
    </Grommet>
  );
};

CustomEdgeControl.storyName = 'Custom edge controls';

export default {
  title: 'Input/RangeSelector/Custom Themed/Custom edge controls',
};

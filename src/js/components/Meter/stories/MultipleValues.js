import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Meter, Stack, Text } from 'mnet-ui-base';

const MultipleValues = () => {
  const total = 100;
  const [active, setActive] = useState();
  const [label, setLabel] = useState();

  return (
    <>
      <Box align="center" pad="large">
        <Stack anchor="center">
          <Meter
            type="circle"
            background="light-2"
            values={[
              {
                value: 60,
                onHover: over => {
                  setActive(over ? 60 : 0);
                  setLabel(over ? 'in use' : undefined);
                },
              },
              {
                value: 30,
                onHover: over => {
                  setActive(over ? 30 : 0);
                  setLabel(over ? 'available' : undefined);
                },
              },
            ]}
            max={100}
            size="small"
            thickness="medium"
          />
          <Box align="center">
            <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
              <Text size="xxlarge" weight="bold">
                {active || total}
              </Text>
              <Text>GB</Text>
            </Box>
            <Text>{label || 'total'}</Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

storiesOf('Meter', module).add('Multiple Values', () => <MultipleValues />);

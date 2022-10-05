import React, { useState } from 'react';

import { Box, Meter, Text } from 'grommet';

export const MultipleValues = () => {
  const total = 100;
  const [active, setActive] = useState(0);
  const [label, setLabel] = useState('');
  const [highlight, setHighlight] = useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="medium">
      <Meter
        type="bar"
        background="light-2"
        values={[
          {
            value: 50,
            onHover: (over) => {
              setActive(over ? 50 : 0);
              setLabel(over ? 'in use' : undefined);
            },
            onClick: () => {
              setHighlight(() => !highlight);
            },
            highlight,
          },
          {
            value: 30,
            onHover: (over) => {
              setActive(over ? 30 : 0);
              setLabel(over ? 'available' : undefined);
            },
          },
        ]}
        max={100}
        size="medium"
        thickness="medium"
        direction="vertical"
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
    </Box>
    // </Grommet>
  );
};

MultipleValues.storyName = 'Vertical Bar Multiple';

export default {
  title: 'Visualizations/Meter/Vertical Bar Multiple',
};

import React, { useState } from 'react';

import { Box } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';

const options = [
  'Apple',
  'Orange',
  'Banana',
  'Grape',
  'Melon',
  'Strawberry',
  'Kiwi',
  'Mango',
  'Raspberry',
  'Rhubarb',
];

export const Help = () => {
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <SelectMultiple
        value={valueMultiple}
        placeholder="Select"
        options={options}
        help="something helpful"
        onChange={({ value }) => setValueMultiple(value)}
      />
    </Box>
    // </Grommet>
  );
};

Help.parameters = {
  chromatic: { disable: true },
};

Help.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Help',
};
